# Miel Ayed 🍯

A premium e-commerce platform for authentic Tunisian honey and bee products. Built with Next.js, Sanity CMS, and modern web technologies.

![Miel Ayed Preview](/public/logo.png)

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **CMS:** [Sanity.io](https://www.sanity.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/) (English, French, Arabic)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Form Validation:** React Hook Form + Zod

## ✨ Features

- **Multilingual Support:** Full support for English, French, and Arabic (RTL).
- **Product Catalog:** Browse products by category and subcategory.
- **Product Variants:** Support for different product weights and prices.
- **Shopping Cart:** Persistent cart functionality with quantity management.
- **Checkout System:**
  - User details collection (Name, Phone, Address).
  - Order creation directly in Sanity CMS.
  - Order success confirmation.
- **Sanity Studio:** Embedded CMS for managing products, categories, and orders.
- **Responsive Design:** Optimized for mobile, tablet, and desktop.
- **Dark/Light Mode:** Theme switching support.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MiledAmer/miel_ayed.git
   cd miel_ayed
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_write_token
   ```

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Sanity Studio

To access the CMS to manage content:
- Navigate to [http://localhost:3000/studio](http://localhost:3000/studio)

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── (website)/       # Main website routes (cart, checkout, products)
│   └── studio/          # Sanity Studio route
├── components/          # Reusable UI components
├── lib/                 # Utilities, stores, and server actions
├── sanity/              # Sanity configuration and schemas
│   ├── schemaTypes/     # Content schemas (product, order, category)
│   └── lib/             # Sanity client and image utilities
├── styles/              # Global styles
└── messages/            # i18n translation files (en, fr, ar)
```

## 📄 License

This project is licensed under the MIT License.
