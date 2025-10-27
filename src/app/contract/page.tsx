import { getContracts } from "@/app/Services/contract/contractServices";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function ViewContractsPage() {
  const contracts = await getContracts();
  const { data, error } = await supabase.from("contracts").select("*");
  console.log(data, error, "me here");


  return (
    <main className="px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Contracts</h2>
        
        <div className="flex gap-2">
          <Link
            href="/contract/view"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            View All
          </Link>

          <Link
            href="/contract/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + New Contract
          </Link>
        </div>
      </div>


      {contracts.length === 0 ? (
        <div className="text-center text-gray-500 py-8 border border-dashed border-gray-300 rounded-lg bg-white">
          <p>No contracts found at the moment.</p>
          <p className="mt-2 text-sm">You can create one using the “+ New Contract” button.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contracts.map((c) => (
            <div key={c.id} className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg text-gray-800">{c.item?.item_name}</h3>
              <p className="text-sm text-gray-500">Lender: {c.lender?.name}</p>
              <p className="text-sm text-gray-500">Borrower: {c.borrower?.name}</p>
              <p className="text-sm text-gray-500 mt-1">Status: {c.status}</p>
              <Link
                href={`/contract/${c.id}`}
                className="text-blue-600 hover:underline text-sm mt-2 inline-block"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
