export const formatRupiah = (val: string | number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(typeof val === "string" ? parseInt(val) : val);
};
