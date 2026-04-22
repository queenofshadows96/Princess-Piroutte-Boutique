import emailjs from "@emailjs/browser";

// Initialize EmailJS
if (typeof window !== "undefined") {
  emailjs.init({
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  });
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (
  formData: ContactFormData
): Promise<boolean> => {
  try {
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
      {
        to_email: "support@princesspirouette.com",
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      }
    );

    console.log("Email sent successfully:", result);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
};

export const sendOrderConfirmationEmail = async (
  customerEmail: string,
  orderDetails: any
): Promise<boolean> => {
  try {
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
      "order_confirmation_template",
      {
        to_email: customerEmail,
        order_id: orderDetails.id,
        order_total: orderDetails.total,
        items: orderDetails.items,
        estimated_delivery: orderDetails.estimated_delivery,
      }
    );

    console.log("Order confirmation email sent:", result);
    return true;
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
    return false;
  }
};
