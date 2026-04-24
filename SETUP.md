# Princess Pirouette Boutique - Setup & Configuration Guide

This guide will walk you through setting up all the integrations and configurations needed for the Princess Pirouette Boutique website.

## Quick Start

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your actual credentials (see sections below).

3. **Start development server**:
   ```bash
   npm run dev
   ```

## Integration Setup

### 1. Supabase (Database & Products)

**Purpose**: Store products, orders, and customer information.

**Setup Steps**:

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. In the project settings, find your **Project URL** and **Anon Key**
4. Add them to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

**Database Schema Creation**:

Create these tables in Supabase SQL Editor:

```sql
-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT,
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  items JSONB NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  stripe_session_id TEXT,
  shipping_address JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Stripe (Payment Processing)

**Purpose**: Handle secure payment processing.

**Setup Steps**:

1. Go to [stripe.com](https://stripe.com)
2. Create an account or sign in
3. Go to API Keys in the Dashboard
4. Copy your **Publishable Key** and **Secret Key** (use test keys for development)
5. Add them to `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   ```
6. Also add your app URL:
   ```
   NEXT_PUBLIC_APP_URL=http://localhost:3000 (for development)
   ```

**Webhook Setup** (optional, for production):

1. In Stripe Dashboard, go to Webhooks
2. Add endpoint for `http://yourdomain.com/api/webhook`
3. Listen for events: `checkout.session.completed`, `payment_intent.succeeded`

### 3. EmailJS (Email Notifications)

**Purpose**: Send contact form emails and order confirmations without a backend server.

**Setup Steps**:

1. Go to [emailjs.com](https://www.emailjs.com)
2. Create a free account
3. Add an Email Service (e.g., Gmail):
   - Go to Email Services
   - Connect your email (Gmail recommended)
   - Verify the connection
4. Create Email Templates:
   - Go to Email Templates
   - Create a template for contact form emails:
     ```
     Subject: New Contact Form Message from {{from_name}}
     
     Name: {{from_name}}
     Email: {{from_email}}
     Subject: {{subject}}
     
     Message:
     {{message}}
     ```
   - Create a template for order confirmations (optional)
5. Get your credentials from Account Settings:
   - **Service ID** (from Email Services)
   - **Template ID** (from Email Templates)
   - **Public Key** (from Account Settings)
6. Add them to `.env.local`:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## Color Scheme Reference

- **Light Gold**: `#D4AF37` - Primary branding color
- **Dark Gold**: `#B8860B` - Darker accents and text
- **Pink Accent**: `#FFD1DC` - Secondary accent
- **Background**: `#FFF5F7` - Main page background
- **Body Text**: `#C09090` - Default text color

## Typography

- **Decorative Font** (magnolia in code): `Great Vibes` - Used for titles
- **Heading Font**: `Playfair Display` italic - Used for section headings and labels

## Project Structure

```
src/
├── app/
│   ├── page.tsx (Home)
│   ├── shop/
│   │   ├── page.tsx (Shop listing)
│   │   └── [id]/page.tsx (Product detail)
│   ├── about/page.tsx
│   ├── faq/page.tsx
│   ├── sizing-guide/page.tsx
│   ├── values/page.tsx
│   ├── contact/page.tsx
│   ├── checkout/
│   │   ├── page.tsx
│   │   ├── success/page.tsx
│   │   └── cancel/page.tsx
│   ├── api/
│   │   ├── create-checkout-session/route.ts
│   │   ├── contact/route.ts
│   │   └── products/route.ts
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── NavBar.tsx
│   ├── HeroSection.tsx
│   ├── ValuesSection.tsx
│   ├── FloatingBackground.tsx
│   ├── FloatingStars.tsx
│   ├── CrownIcon.tsx
│   └── ui/
├── context/
│   └── CartContext.tsx
├── lib/
│   ├── supabase.ts
│   ├── stripe.ts
│   ├── emailjs.ts
│   └── utils.ts
└── custom.d.ts
```

## Features Implemented

✅ **Home Page** - Hero section with decorative elements and values cards
✅ **Shop Page** - Product listing (ready for Supabase integration)
✅ **Product Detail Page** - Dynamic product page at `/shop/[id]`
✅ **About Page** - Company information and story
✅ **FAQ Page** - Accordion with frequently asked questions
✅ **Sizing Guide** - Size charts and measurement instructions
✅ **Our Values Page** - Company values with SVG crown icons
✅ **Contact Page** - Contact form with EmailJS integration
✅ **Checkout Page** - Shopping cart review and billing form
✅ **Checkout Success** - Order confirmation page
✅ **Checkout Cancel** - Order cancellation page
✅ **NavBar** - Navigation with cart icon (no emojis, uses SVG crown)
✅ **Floating Background** - Animated star effects
✅ **Design System** - Complete color scheme and typography

## Development Tips

### Running the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Building for Production

```bash
npm run build
npm run start
```

### Testing Email Functionality

1. Install EmailJS browser library (already in dependencies)
2. Make sure all EmailJS environment variables are set
3. Test contact form on `/contact` page

### Testing Stripe

Use Stripe's test card numbers:
- **Visa**: `4242 4242 4242 4242`
- **MasterCard**: `5555 5555 5555 4444`
- Any future date for expiry
- Any 3-digit CVC

## Deployment Checklist

Before deploying to production:

- [ ] Set up production Supabase project with proper security rules
- [ ] Switch to Stripe live keys
- [ ] Configure production email service in EmailJS
- [ ] Set up environment variables in deployment platform (Vercel, Netlify, etc.)
- [ ] Test all integrations in production environment
- [ ] Set up SSL certificate (HTTPS)
- [ ] Configure custom domain
- [ ] Enable Stripe webhooks for production

## Troubleshooting

### Supabase Connection Issues

- Verify URL and Anon Key in `.env.local`
- Check if RLS (Row Level Security) policies are correct
- Make sure tables are properly created with correct schema

### Stripe Errors

- Ensure NEXT_PUBLIC_APP_URL is set correctly
- Verify API keys are for the correct environment (test vs live)
- Check console for detailed error messages

### EmailJS Not Sending

- Verify service ID, template ID, and public key
- Check email template is properly configured
- Make sure email service is connected and verified
- Test with a simple message first

## Support & Resources

- [Supabase Docs](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [EmailJS Documentation](https://www.emailjs.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
