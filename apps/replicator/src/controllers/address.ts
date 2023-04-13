import { get_address_id_by_label, upsert_address_db } from "../models/address";

export const get_address_id = async (
  label: string,
  countryCode: string | null,
  countryName: string | null,
  state: string | null,
  city: string | null,
  district: string | null,
  street: string | null,
  postalCode: string | null
): Promise<number> => {
  return await upsert_address_db(
    label,
    countryCode,
    countryName,
    state,
    city,
    district,
    street,
    postalCode
  );
};
