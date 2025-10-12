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
import Cart from "./pages/Cart/Cart";
import Account from "./pages/Account/Account";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Checkout from "./pages/Checkout/Checkout";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import Profile from "./pages/Account/Profile";
import Settings from "./pages/Account/Settings";
import Orders from "./pages/Account/Orders";
import ConfirmPayment from './pages/ConfirmPayment/ConfirmPayment'
import AdminPanel from "./pages/AdminPanel/AdminPanel";


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
      },
      {
        path:"/cart-items",
        element:<Cart/>
      },
      {
        path:"/account-details",
        element:<ProtectedRoute><Account/></ProtectedRoute>,
        children:[
          {
            path:'profile',
            element:<ProtectedRoute><Profile/></ProtectedRoute>
          },
          {
            path:'orders',
            element:<ProtectedRoute><Orders/></ProtectedRoute>,
          },
          {
            path:'settings',
            element:<ProtectedRoute><Settings/></ProtectedRoute>,
          }
        ]
      },
      {
        path:"/checkout",
        element:<ProtectedRoute><Checkout/></ProtectedRoute>
      },
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
  },
  {
    path:"/oauth2/callback",
    element:<OAuth2LoginCallback/>
  },
  {
    path:"/confirmPayment",
    element:<ConfirmPayment/>
  },
  {
    path:"/admin/*",
    element:<AdminPanel />
  }
]);
