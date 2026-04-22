import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Cancelled | Princess Pirouette Boutique",
  description: "Your order has been cancelled.",
};

export default function CheckoutCancelPage() {
  return (
    <main style={{ backgroundColor: "#FFF5F7", minHeight: "100vh", paddingTop: "100px" }}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1
            className="text-5xl font-magnolia mb-4"
            style={{ color: "#D4AF37" }}
          >
            Order Cancelled
          </h1>

          <p className="text-xl mb-6" style={{ color: "#C09090" }}>
            Your order has been cancelled. No charges have been made to your account.
          </p>
        </div>

        <div className="p-8 rounded-lg border-2 bg-white mb-8" style={{ borderColor: "#B8860B" }}>
          <h2 className="text-2xl font-playfair italic font-bold mb-6" style={{ color: "#B8860B" }}>
            What Happened?
          </h2>

          <p style={{ color: "#C09090", lineHeight: "1.8", marginBottom: "1rem" }}>
            Your payment was not processed because you exited the checkout page before completing your
            purchase. Your cart items are still saved, and you can complete your purchase at any time.
          </p>
        </div>

        <div className="p-8 rounded-lg border-2 bg-white mb-8" style={{ borderColor: "#B8860B" }}>
          <h2 className="text-2xl font-playfair italic font-bold mb-6" style={{ color: "#B8860B" }}>
            Want to Try Again?
          </h2>

          <p style={{ color: "#C09090", lineHeight: "1.8", marginBottom: "1rem" }}>
            Your items are still in your cart. Feel free to review your order and try checking out again whenever
            you're ready.
          </p>

          <Link
            href="/checkout"
            className="inline-block px-8 py-3 rounded-lg font-playfair italic font-semibold text-white transition-all"
            style={{ backgroundColor: "#D4AF37" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B8860B")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
          >
            Return to Checkout
          </Link>
        </div>

        <div className="p-8 rounded-lg border-2 bg-white mb-8" style={{ borderColor: "#B8860B" }}>
          <h2 className="text-2xl font-playfair italic font-bold mb-4" style={{ color: "#B8860B" }}>
            Need Help?
          </h2>
          <p style={{ color: "#C09090", marginBottom: "1rem" }}>
            If you encountered any issues during checkout or have questions, our support team is here to help.
          </p>
          <Link
            href="/contact"
            className="text-center block px-6 py-2 rounded-lg font-playfair italic font-semibold text-white transition-all"
            style={{ backgroundColor: "#D4AF37" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B8860B")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
          >
            Contact Support
          </Link>
        </div>

        <div className="text-center space-y-4">
          <Link
            href="/shop"
            className="inline-block px-8 py-3 rounded-lg font-playfair italic font-semibold text-white transition-all"
            style={{ backgroundColor: "#D4AF37" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B8860B")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
          >
            Continue Shopping
          </Link>
          <br />
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-lg font-playfair italic font-semibold border-2"
            style={{ borderColor: "#B8860B", color: "#B8860B", backgroundColor: "transparent" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FFF5F7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
