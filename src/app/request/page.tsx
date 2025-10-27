"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { getRequestsByOwner, updateRequestStatus } from "@/app/Services/request/requestServices";
import { createContract } from "@/app/Services/contract/contractServices";

export default function RequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    async function loadRequests() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const data = await getRequestsByOwner(user.id);
      setRequests(data);
    }
    loadRequests();
  }, []);

  async function handleDecision(req: any, decision: "Accepted" | "Rejected") {
    await updateRequestStatus(req.id, decision);

    if (decision === "Accepted") {
      // auto-create contract
      await createContract({
        lender_id: req.owner_id,
        borrower_id: req.borrower.id,
        item_id: req.item_id,
        start: new Date().toISOString().split("T")[0],
        end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "Active",
        terms: "Default lending terms",
        category: "General",
      });

      // make item unavailable
      await supabase.from("items").update({ status: "unavailable" }).eq("id", req.item_id);
    }

    alert(`✅ Request ${decision}`);
    location.reload();
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">Incoming Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">No pending requests at the moment.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <p><strong>Borrower:</strong> {req.borrower?.name}</p>
                <p><strong>Status:</strong> {req.status}</p>
              </div>
              {req.status === "Pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision(req, "Accepted")}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecision(req, "Rejected")}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
