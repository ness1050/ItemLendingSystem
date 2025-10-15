import React from "react";
import { CalendarDays } from "lucide-react";

interface ContractCardProps {
  itemName: string;
  itemImage: string;
  lender: string;
  borrower: string;
  startDate: string;
  endDate: string;
  status: "Pending" | "Active" | "Completed" | "Cancelled";
  terms?: string;
}

export default function ContractCard({
  itemName,
  itemImage,
  lender,
  borrower,
  startDate,
  endDate,
  status,
  terms,
}: ContractCardProps) {
  const statusColors: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-700",
    Active: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img src={itemImage} alt={itemName} className="h-40 w-full object-cover" />

      <div className="p-4 flex flex-col gap-2">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{itemName}</h3>
          <span className={`text-sm px-3 py-1 rounded-full ${statusColors[status]}`}>
            {status}
          </span>
        </div>

        {/* Users */}
        <div className="text-sm text-gray-600">
          <p><strong>Lender:</strong> {lender}</p>
          <p><strong>Borrower:</strong> {borrower}</p>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2 text-gray-700 text-sm mt-2">
          <CalendarDays className="w-4 h-4" />
          <span>
            {new Date(startDate).toLocaleDateString()} → {new Date(endDate).toLocaleDateString()}
          </span>
        </div>

        {/* Terms */}
        {terms && <p className="text-xs text-gray-500 italic mt-1">“{terms}”</p>}

        {/* Actions */}
        <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
}
