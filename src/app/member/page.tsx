"use client";
import AddItemForm from "../ui/page";
import MyItemsList from "./MyItemList";

export default function MembersPage() {
  return (
    <main className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        My Lending Dashboard
      </h1>
      <AddItemForm ownerId={""} />
      <MyItemsList />
    </main>
  );
}
