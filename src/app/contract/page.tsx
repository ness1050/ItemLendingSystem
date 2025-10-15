"use client";

import React from "react";
import ContractCard from "@/app/components/contractCard";
import contracts from "@/app/Data/data";

export default function ContractsPage() {
  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Loan Contracts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contracts.map((contract) => (
          <ContractCard
            key={contract.id}
            itemName={contract.item.name}
            itemImage={contract.item.imageUrl}
            lender={contract.lender.name}
            borrower={contract.borrower.name}
            startDate={contract.startDate}
            endDate={contract.endDate}
            status={
              ["Pending", "Active", "Completed", "Cancelled"].includes(contract.status)
                ? contract.status as "Pending" | "Active" | "Completed" | "Cancelled"
                : "Pending"
            }
            terms={contract.terms}
          />
        ))}
      </div>
    </section>
  );
}
