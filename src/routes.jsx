import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout';
import App from './App'; // Homepage
import { ProductListPage } from "./pages/productListPage/ProductListPage";
import {ProductDetail} from "./pages/productListPage/ProductDetailPage/ProductDetail"
import { loadProductBySlug } from "./routes/products";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "mens",
        element: <ProductListPage categoryType={'MEN'} />,
      },
      {
        path: "womens",
        element: <ProductListPage categoryType={'WOMEN'}/>,
      },
      {
        path: "kids",
        element: <ProductListPage categoryType={'KIDS'}/>,
      },
      {
        path: "products/:slug",
        loader: loadProductBySlug,
        element: <ProductDetail/>
      }
    ],
  },
]);
