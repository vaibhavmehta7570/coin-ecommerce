This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

# Coin E-commerce Project

This project is an e-commerce application for coins, built with Next.js. It utilizes various technologies and libraries to provide a seamless user experience, including TanStack Query, Zustand, Shadcn, and Tailwind CSS.
Github: https://github.com/vaibhavmehta7570/coin-ecommerce/tree/master

## Table of Contents

1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [APIs Used](#apis-used)
4. [Key Features](#key-features)
5. [Technologies Used](#technologies-used)
6. [Installation and Setup](#installation-and-setup)
7. [Deployment](#deployment)
8. [Future Enhancements](#future-enhancements)
9. [Demo Video](#demo-video)
10. [Credits](#credits)

## Project Overview

This project is a Next.js application for coin e-commerce. The application includes features such as category listing, product listing, product detail view, add-to-cart functionality, and user authentication.

## Folder Structure

````plaintext
coin-ecommerce/
├── .next/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── [category]/
│   │   │   └── page.tsx
│   │   ├── auth/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── thank-you/
│   │   │       └── page.tsx
│   │   ├── product/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── search/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── home/
│   │   ├── ui/
│   │   │   ├── AddToCart.tsx
│   │   │   ├── AuthModal.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Nav.tsx
│   │   │   └── Slider.tsx
│   ├── lib/
│   │   ├── auth/
│   │   ├── CartStore.ts
│   │   ├── Tanstack.tsx
│   │   ├── Types.ts
│   │   └── utils.ts
│   ├── styles/
│   │   └── globals.css
├── .eslint.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── tsconfig.json


```markdown
# Coin E-commerce Project

This project is an e-commerce application for coins, built with Next.js. It utilizes various technologies and libraries to provide a seamless user experience, including TanStack Query, Zustand, Shadcn, and Tailwind CSS.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [APIs Used](#apis-used)
4. [Key Features](#key-features)
5. [Technologies Used](#technologies-used)
6. [Installation and Setup](#installation-and-setup)
7. [Deployment](#deployment)
8. [Future Enhancements](#future-enhancements)
9. [Demo Video](#demo-video)
10. [Credits](#credits)

## Project Overview

This project is a Next.js application for coin e-commerce. The application includes features such as category listing, product listing, product detail view, add-to-cart functionality, and user authentication.

## Folder Structure

```plaintext
coin-ecommerce/
├── .next/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── [category]/
│   │   │   └── page.tsx
│   │   ├── auth/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── thank-you/
│   │   │       └── page.tsx
│   │   ├── product/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── search/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── home/
│   │   ├── ui/
│   │   │   ├── AddToCart.tsx
│   │   │   ├── AuthModal.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Nav.tsx
│   │   │   └── Slider.tsx
│   ├── lib/
│   │   ├── auth/
│   │   ├── CartStore.ts
│   │   ├── Tanstack.tsx
│   │   ├── Types.ts
│   │   └── utils.ts
│   ├── styles/
│   │   └── globals.css
├── .eslint.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── tsconfig.json
````

## APIs Used

All APIs used in this project are from [dummyjson.com](https://dummyjson.com/docs/auth):

- **Category List:** `https://dummyjson.com/products/categories`
- **Category Products:** `https://dummyjson.com/products/category/smartphones`
- **Product Details:** `https://dummyjson.com/products/1`
- **User Authentication:** `https://dummyjson.com/auth/login`

## Key Features

- **Homepage:** Lists all categories.
- **Category Page:** Displays products specific to a category with pagination.
- **Product Detail Page:** Shows detailed information about a selected product.
- **Add to Cart:** Users can add products to their cart.
- **User Authentication:** Required for checkout. Uses predefined user credentials.

## Technologies Used

- **Next.js:** Framework for server-side rendering and static site generation.
- **TanStack Query:** For API calls with caching and pagination support.
- **Zustand:** For state management, particularly for the cart and authentication state.
- **Shadcn:** Component library built on Radix UI.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Axios:** For making HTTP requests.
- **npm:** Package manager used for managing project dependencies.

## Installation and Setup

1. Clone the repository and checkout the master branch:

   ```bash
   git clone <repository_url>
   cd coin-ecommerce
   git checkout master
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
4. Demo Credentials to login whicle procedding for checkout
   ```
   username: emilys
   password: emilyspass
   ```

## Deployment

This project has been deployed on Netlify and Vercel. For more details on deployment, refer to the following documentation:

- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)

## Future Enhancements

1. Add testing using React Testing Library and Jest.
2. Integrate Stripe for payment processing.
3. Add support for filters and sorting.
4. Implement user notifications via Gmail and WhatsApp.
5. order history page and track placed orders.

## Demo Video

Attached below is a Loom video showcasing the project:

- [Loom Video](https://www.loom.com/share/39da4eabb29a4eb286641ef8447973ab)

## Credits

- [dummyjson.com](https://dummyjson.com/docs/auth) for providing the APIs.
- [Shadcn](https://ui.shadcn.com/) for the UI components.

Happy coding!
