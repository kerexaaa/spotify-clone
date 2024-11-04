import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ProductWithPrice } from "@types";
import { cookies } from "next/headers";

const getActiveProducts = async (): Promise<ProductWithPrice[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { foreignTable: "prices" });

  if (error) {
    console.log(`An error occured in activeProducts on line 19 ${error}`);
    return [];
  }

  if (!data) {
    return [];
  }

  return (data as any) || [];
};

export default getActiveProducts;
