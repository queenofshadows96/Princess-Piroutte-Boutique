import { Metadata } from "next";
import Link from "next/link";
import CrownIcon from "@/components/CrownIcon";

export const metadata: Metadata = {
  title: "Order Successful | Princess Pirouette Boutique",
  description: "Your order has been placed successfully.",
};

export default function CheckoutSuccessPage() {
  return (
    <main style={{ backgroundColor: "#FFF5F7", minHeight: "100vh", paddingTop: "100px" }}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="rounded-full p-6" style={{ backgroundColor: "#FFD1DC" }}>
              <CrownIcon width={64} height={64} color="#D4AF37" />
            </div>
          </div>

          <h1
            className="text-5xl font-magnolia mb-4"
            style={{ color: "#D4AF37" }}
          >
            Order Confirmed!
          </h1>

          <p className="text-xl mb-6" style={{ color: "#C09090" }}>
            Thank you for your purchase. Your magical order has been confirmed!
          </p>
        </div>

        <div className="p-8 rounded-lg border-2 bg-white mb-8" style={{ borderColor: "#B8860B" }}>
          <h2 className="text-2xl font-playfair italic font-bold mb-6" style={{ color: "#B8860B" }}>
            Order Details
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between pb-4 border-b" style={{ borderColor: "#FFD1DC" }}>
              <span style={{ color: "#B8860B" }}>Order Number</span>
              <span style={{ color: "#D4AF37" }} className="font-bold">
                #PPB-2024-001
              </span>
            </div>

            <div className="flex justify-between pb-4 border-b" style={{ borderColor: "#FFD1DC" }}>
              <span style={{ color: "#B8860B" }}>Order Date</span>
              <span style={{ color: "#C09090" }}>
                {new Date().toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between pb-4 border-b" style={{ borderColor: "#FFD1DC" }}>
              <span style={{ color: "#B8860B" }}>Total Amount</span>
              <span style={{ color: "#D4AF37" }} className="font-bold">
                $XX.XX
              </span>
            </div>

            <div className="flex justify-between" style={{ borderColor: "#FFD1DC" }}>
              <span style={{ color: "#B8860B" }}>Estimated Delivery</span>
              <span style={{ color: "#C09090" }}>5-7 business days</span>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-lg border-2 bg-white mb-8" style={{ borderColor: "#B8860B" }}>
          <h2 className="text-2xl font-playfair italic font-bold mb-6" style={{ color: "#B8860B" }}>
            What's Next?
          </h2>

          <ul style={{ color: "#C09090", lineHeight: "1.8" }}>
            <li className="mb-3">
              ✨ <strong>Confirmation Email:</strong> You'll receive a confirmation email shortly with your receipt
              and order details.
            </li>
            <li className="mb-3">
              ✨ <strong>Tracking:</strong> We'll send you a tracking number as soon as your order ships.
            </li>
            <li className="mb-3">
              ✨ <strong>Updates:</strong> Keep an eye on your email for shipping updates and delivery
              notifications.
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-lg border-2 bg-white mb-8" style={{ borderColor: "#B8860B" }}>
          <h2 className="text-2xl font-playfair italic font-bold mb-4" style={{ color: "#B8860B" }}>
            Questions?
          </h2>
          <p style={{ color: "#C09090", marginBottom: "1rem" }}>
            If you have any questions about your order, please don't hesitate to contact our support team.
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
