# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

# ShoppyGlobe - React E-commerce Application

## Overview

ShoppyGlobe is a responsive React-based e-commerce web application that allows users to browse products by category, view product details, and manage a shopping cart. The app leverages modern React features such as hooks, Redux Toolkit for state management, React Router for navigation, and Tailwind CSS for styling. It implements code splitting and lazy loading for optimal performance.

## Features

- **Product Listing**: Fetches products asynchronously from a remote API using Redux Toolkit's `createAsyncThunk`.
- **Category Filtering**: Users can filter products by categories.
- **Product Details**: View detailed information about each product.
- **Shopping Cart**: Add and manage products in a cart (assumed feature based on context).
- **Responsive Design**: Fully responsive layouts using Tailwind CSS.
- **Code Splitting & Lazy Loading**: Components load lazily to reduce initial bundle size.
- **Toast Notifications**: User feedback via React Toastify.
- **Accessibility**: Keyboard navigation support for interactive elements.
- **Error Handling**: Graceful handling of API errors.

## Technologies Used

| Technology            | Purpose                               |
| --------------------- | ------------------------------------- |
| React                 | UI library for building components    |
| React Router DOM      | Client-side routing                   |
| Redux Toolkit         | State management, async data fetching |
| Axios                 | HTTP client for API calls             |
| Tailwind CSS          | Utility-first CSS framework           |
| React Toastify        | Toast notifications for user feedback |
| React Lazy & Suspense | Code splitting and lazy loading       |

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/shoppyglobe.git
   cd shoppyglobe

   ```

2. **Install Depedencies:**

    npm install
    # or
    yarn install

3. **Start the Deployment Server:**
    npm run dev
    # or
    yarn run dev
     

## Usage Details

    Redux Slice (productSlice.js)
        Uses createAsyncThunk for async API calls to fetch products.

    Manages product list state: items, status (loading, fulfilled, failed), and error.

    Routing and Lazy Loading (App.jsx)
        Uses React.lazy and Suspense for lazy loading components.

    Routes defined with React Router v6 (Routes and Route).

    Shows a fallback loading message while components load.

    Category Filtering (Category.jsx)
        Displays category buttons dynamically.

    Filters products on button click.

    Clicking a product navigates to product details page.

## Styling (Tailwind CSS)
    Responsive and utility-first styling.

    Full width background sections (w-screen), responsive grids, and buttons.

## Notifications
React Toastify configured in App.jsx for non-blocking toast messages.

## Available Scripts
npm start or yarn start: Run the app in development mode.

npm run build or yarn build: Build the app for production.

npm test or yarn test: Launch test runner (if tests added).



## Contribution
Feel free to fork the repository and submit pull requests. Please follow best practices and write clean, maintainable code.

## License
This project is licensed under the MIT License.

## Contact
Email- akhileshyadu001@gmail.com
GitHub: https://github.com/Akhileshyadu00


