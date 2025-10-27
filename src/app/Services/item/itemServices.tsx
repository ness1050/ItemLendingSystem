
import { supabase } from "../../lib/supabase"


export async function addItem(itemData: {
  item_name: string;
  description?: string;
  category?: string;
  status?: string;
}) {
  // Get logged-in user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("No logged-in user found");

  const { data, error } = await supabase.from("items").insert([
    {
      owner_id: user.id,
      item_name: itemData.item_name,
      description: itemData.description,
      category: itemData.category,
      status: itemData.status || "available",
    },
  ]);

  if (error) throw error;
  return data;
}


export async function getAvailableItems() {
  const { data, error } = await supabase
    .from("items")
    .select(`
      id,
      item_name,
      category,
      status,
      owner:users!items_owner_id_fkey (id, name)
    `)
    .eq("status", "available");

  if (error) {
    console.error("Error fetching items:", error.message);
    return [];
  }

  return data || [];
}

export async function getItemById(id: string) {
  const { data, error } = await supabase.from("items").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}



export async function getAllItems(status?: string) {

    let query = supabase.from("items").select("*").order("created_at", {
        ascending:false
    });
    if (status) query = query.eq("status", status);
    const {data, error} = await query;
    if (error)  throw ("Cannot fetch or get data");
    return data;
}


// get borrowed Items
export async function getItemsByUser(owner_id: string) {
    const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("owner_id", owner_id)
        .order("created_at", { ascending: false });

    if (error) throw new Error("couldn't get any item for user");
    return data;
}


// Delete item
export async function deleteItem(itemId: string) {
    const {error} = await supabase.from("items").delete().eq("id", itemId);
    if (error) throw error;
    return true; 
}

// update Item
export async function updateItemStatus(itemId: string, newStatus: string) {
    const {data, error} = await supabase.from("items").update({status: newStatus}).eq("id", itemId);

    if (error) throw error;
    return data;
}

export async function getCategories() {
  const { data, error } = await supabase
    .from("items")
    .select("category");

  if (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }

  // Remove duplicates and nulls
  const uniqueCategories = Array.from(
    new Set(data.map((item) => item.category).filter(Boolean))
  );

  return uniqueCategories;
}



