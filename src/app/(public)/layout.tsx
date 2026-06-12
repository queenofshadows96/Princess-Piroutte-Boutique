import NavBar from "@/components/NavBar";
import { CartProvider } from "@/context/CartContext";

export default function PublicLayout({ children }) {
  return (
    <CartProvider>
      <NavBar />
      {children}
    </CartProvider>
  );
}
