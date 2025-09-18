import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout';
import App from './App'; // Homepage
import { ProductListPage } from "./pages/productListPage/ProductListPage";
import {ProductDetail} from "./pages/productListPage/ProductDetailPage/ProductDetail"
import { loadProductBySlug } from "./routes/products";
import AuthenticationWrapper from "./pages/AuthenticationWrapper";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { OAuth2LoginCallback } from "./pages/OAuth2LoginCallback";
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
  {
    path:"/v1/",
    element:<AuthenticationWrapper/>,
    children:[
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"register",
        element:<Register/>
      }
    ]
  },{
    path:"/oauth2/callback",
    element:<OAuth2LoginCallback/>
  }
]);
