import { supabase } from "@/app/lib/supabase";

// ✅ Create a new loan entry
export async function createLoan(loanData: {
  item_id: string;
  borrower_id: string;
  start?: string;
  end?: string;
  status?: string;
}) {
  const { data, error } = await supabase.from("loans").insert([
    {
      item_id: loanData.item_id,
      borrower_id: loanData.borrower_id,
      start: loanData.start || new Date().toISOString(),
      end: loanData.end || null,
      status: loanData.status || "borrowed",
    },
  ]);

  if (error) throw error;
  return data;
}

// Fetch all loans for a given user (joined with item info)
export async function getLoanByUser(userId: string) {
  const { data, error } = await supabase
    .from("loans")
    .select(`
      id,
      status,
      start,
      end,
      item:items!loans_item_id_fkey ( item_name, category, image_url )
    `)
    .eq("borrower_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
