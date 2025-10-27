
import { supabase } from "@/app/lib/supabase";

// Borrower creates a request for an item
export async function createRequest(item_id: string, owner_id: string) {
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError) throw new Error("Failed to get user session.");
  if (!user) throw new Error("You must be logged in to send a request.");

  // 🛑 Check for existing request before inserting
  const { data: existingRequests, error: checkError } = await supabase
    .from("requests")
    .select("id, status")
    .eq("item_id", item_id)
    .eq("borrower_id", user.id)
    .maybeSingle();

  if (checkError) throw checkError;

  if (existingRequests) {
    throw new Error(`You already have a ${existingRequests.status} request for this item.`);
  }

  // ✅ Insert new request
  const { data, error } = await supabase.from("requests").insert([
    {
      item_id,
      borrower_id: user.id,
      owner_id,
      status: "Pending",
    },
  ]);

  if (error) throw error;

  return data;
}

export async function getRequestsByUser(userId: string) {
  const { data, error } = await supabase
    .from("requests")
    .select(`
      id,
      status,
      item:items!requests_item_id_fkey ( item_name ),
      borrower:users!requests_borrower_id_fkey ( name, email ),
      owner:users!requests_owner_id_fkey ( name, email )
    `)
    .or(`owner_id.eq.${userId},borrower_id.eq.${userId}`);

  if (error) {
    console.error("Request fetch error:", error);
    throw new Error(error.message);
  }

  console.log("✅ Joined request data:", data);
  return data;
}
