"use server";

import { supabase } from "@/app/lib/supabase";


export async function getContracts() {
  const { data, error } = await supabase
  .from("contracts")
  .select(`
    id,
    start,
    end,
    status,
    terms,
    category,
    item:items (item_name, description),
    lender:users!contracts_lender_id_fkey (name),
    borrower:users!contracts_borrower_id_fkey (name)
  `)
  .order("created_at", { ascending: false });


  if (error) {
    console.error("Error fetching contracts:", error.message);
    return [];
  }

  console.log("Fetched contracts:", data);
  return data;
}




export async function getContractById(id: string) {
  // 1️⃣ Get the contract itself
  const { data: contract, error: contractError } = await supabase
    .from("contracts")
    .select("*")
    .eq("id", id)
    .single();

  if (contractError) throw new Error(contractError.message);

  const { data: item } = await supabase
    .from("items")
    .select("item_name, description")
    .eq("id", contract.item_id)
    .single();

  const { data: lender } = await supabase
    .from("users")
    .select("name, email")
    .eq("id", contract.lender_id)
    .single();

  const { data: borrower } = await supabase
    .from("users")
    .select("name, email")
    .eq("id", contract.borrower_id)
    .single();

  return {
    id: contract.id,
    startDate: contract.start,
    endDate: contract.end,
    status: contract.status,
    terms: contract.terms,
    category: contract.category,
    item: { name: item?.item_name || "Unknown", description: item?.description || "" },
    lender: { name: lender?.name || "Unknown", email: lender?.email },
    borrower: { name: borrower?.name || "Unknown", email: borrower?.email },
  };
}


export async function createContract(contractData: {
    lender_id: string;
    borrower_id: string;
    item_id: string;
    start: string;
    end: string;
    status: string;
    terms: string;
    category: string;
}) {
    const {data, error} = await supabase.from(
        "contracts"
    ).insert([contractData]);

    if (error) throw error;
    console.log("✅ Contract inserted:", data);
    return data;
    
}



export async function updateContract (id: string, updates: Record<string, any>) {
    const {data, error} = await supabase.from(
        "contracts"
    ).update(updates).eq("id",id).select();
    if (error) throw error;
    return data;
} 

export async function deleteContract(id: string) {
    const error = await supabase.from("contracts").delete().eq("id", id);
    if (error) throw error;

}