import { getContractById } from "@/app/Services/contract/contractServices";


export default async function ContractDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contract = await getContractById(id);

  if (!contract) return <p>Contract not found.</p>;

  return (
    <main className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Contract Details</h1>
      <div className="space-y-2">
        <p><strong>Item:</strong> {contract.item.name}</p>
        <p><strong>Lender:</strong> {contract.lender.name}</p>
        <p><strong>Borrower:</strong> {contract.borrower.name}</p>
        <p><strong>Start:</strong> {contract.startDate}</p>
        <p><strong>End:</strong> {contract.endDate}</p>
        <p><strong>Status:</strong> {contract.status}</p>
        <p><strong>Terms:</strong> {contract.terms}</p>
      </div>
    </main>
  );
}
