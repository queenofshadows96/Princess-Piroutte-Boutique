// src/app/(admin)/admin/products/components/PriceInput.tsx

type Props = {
  defaultValue: number;
};

export default function PriceInput({ defaultValue }: Props) {
  return (
    <input
      name="price"
      type="number"
      step="0.01"
      defaultValue={defaultValue}
      className="w-full p-3 rounded-lg border"
      style={{ borderColor: "#B8860B", backgroundColor: "white" }}
      required
    />
  );
}
