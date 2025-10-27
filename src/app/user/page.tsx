"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { getItemsByUser } from "../Services/item/itemServices";
import { createLoan } from "../Services/loan/loanservices";
import { getRequestsByUser } from "../Services/request/requestServices";


export default function MemberPage() {
  const [user, setUser] = useState(null);
  const [myItems, setMyItems] = useState([]);
  const [borrowedItems, setBorrowedItems] = useState([]);
  const [requests, setRequests] = useState([]);

  // Load session + user data
  useEffect(() => {
    async function loadData() {
      const { data: session } = await supabase.auth.getSession();
      const user = session?.session?.user;
      if (!user) return;
    
  

      setUser(user);

      if (user) {
        await fetchData(user.id);
      }
    }
    loadData();
  }, []);

async function fetchData(userId: string) {
  const [myItemsData, borrowedData, requestsData] = await Promise.all([
    supabase.from("items").select("*").eq("owner_id", userId),
    supabase.from("loans").select("*, items(name, category)").eq("borrower_id", userId),
    getRequestsByUser(userId), // ✅ Use the joined query
  ]);

  setMyItems(myItemsData.data || []);
  setBorrowedItems(borrowedData.data || []);
  setRequests(requestsData || []);
}

  async function handleAcceptRequest(req: any) {
  try {
    // 1️⃣ Update request status to "Accepted"
    const { error: updateError } = await supabase
      .from("requests")
      .update({ status: "Accepted" })
      .eq("id", req.id);

    if (updateError) throw updateError;

    // 2️⃣ Create a contract automatically
    const { error: contractError } = await supabase.from("contracts").insert([
      {
        item_id: req.item_id,
        lender_id: req.owner_id,
        borrower_id: req.borrower_id,
        start: new Date().toISOString().split("T")[0],
        end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // +7 days
        status: "Active",
        terms: "Standard lending terms",
        category: "General",
      },
    ]);

    if (contractError) throw contractError;

    // 3️⃣ Create a loan record for tracking borrowed items
    await createLoan({
      item_id: req.item_id,
      borrower_id: req.borrower_id,
      start: new Date().toISOString(),
      end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "borrowed",
    });

    // 4️⃣ Mark the item as unavailable
    await supabase.from("items").update({ status: "unavailable" }).eq("id", req.item_id);

    alert("✅ Request accepted, contract and loan created!");
    fetchData(user.id); // Refresh all sections
  } catch (err: any) {
    console.error("Error accepting request:", err);
    alert("❌ Failed to accept request: " + err.message);
  }
}


async function handleRejectRequest(requestId: string) {
  try {
    await supabase.from("requests").update({ status: "Rejected" }).eq("id", requestId);
    alert("🚫 Request rejected.");
    fetchData(user.id);
  } catch (err: any) {
    console.error("Error rejecting request:", err);
    alert("❌ Failed to reject request: " + err.message);
  }
}


  return (
    <main className="p-6 min-h-screen bg-gray-50">
      <h1 className="flex justify-center text-3xl font-bold mb-6 text-black">Welcome, {user?.email}</h1>

      {/* User summary */}
      <section className="mb-8 bg-black rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-3">My Overview</h2>
        <div className="flex gap-6 text-white">
          <p>📦 Items: {myItems.length}</p>
          <p>📥 Borrowed: {borrowedItems.length}</p>
          <p>🕓 Requests/lent: {requests.length}</p>
        </div>
      </section>

      {/* My Items */}
      <section className="mb-20 grid grid-cols gap-4 align-items">
        <h2 className="text-xl text-black font-semibold mb-4">My Items</h2>
        <Link
          href="/Member"
          className="bg-blue-600 text-white w-50 px-4 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add/Delete/Update
        </Link>
     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {myItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
              <Image
                src={item.image_url || "/icons/box.svg"}
                alt={item.name}
                width={80}
                height={80}
                className="mb-2 rounded-md"
              />
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-sm text-gray-500 mt-1">Status: {item.status}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Borrowed Items */}
      <section>
        <h2 className="text-xl font-semibold text-black mb-4">Borrowed Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {borrowedItems.map((loan) => (
            <div key={loan.id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-bold">{loan.items?.name}</h3>
              <p className="text-sm text-gray-600">{loan.items?.category}</p>
              <p className="text-sm text-gray-500 mt-1">Due: {loan.due_date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Requests Section */}
<section className="mt-10">
    <h2 className="text-xl font-semibold text-black mb-4">Requests</h2>

    {requests.length === 0 ? (
      <p className="text-gray-600">No requests found.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map((req) => (
          <div key={req.id} className="bg-white p-4 rounded-xl shadow">
           <p className="text-sm text-gray-600">
            <strong>Item:</strong> {req.item?.item_name ?? "—"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Borrower:</strong> {req.borrower?.name ?? "—"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Owner:</strong> {req.owner?.name ?? "—"}
          </p>



            <p className="text-sm text-gray-600">
              Status:{" "}
              <span
                className={`font-semibold ${
                  req.status === "Pending"
                    ? "text-yellow-600"
                    : req.status === "Accepted"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {req.status}
              </span>
            </p>

            {/* If the logged-in user is the owner and request is pending */}
            {req.status === "Pending" && req.owner_id === user?.id && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleAcceptRequest(req)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectRequest(req.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    )}
</section>

    </main>
  );
}
