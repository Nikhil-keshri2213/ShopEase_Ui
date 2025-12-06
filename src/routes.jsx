import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout.jsx';
import App from './App.jsx'; // Homepage
import { ProductListPage } from "./pages/productListPage/ProductListPage.jsx";
import {ProductDetail} from "./pages/productListPage/ProductDetailPage/ProductDetail.jsx"
import { loadProductBySlug } from "./routes/products.jsx";
import AuthenticationWrapper from "./pages/AuthenticationWrapper.jsx";
import { Login } from "./pages/Login/Login.jsx";
import { Register } from "./pages/Register/Register.jsx";
import { OAuth2LoginCallback } from "./pages/OAuth2LoginCallback.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Account from "./pages/Account/Account.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import PaymentPage from "./pages/PaymentPage/PaymentPage.jsx";
import Profile from "./pages/Account/Profile.jsx";
import Settings from "./pages/Account/Settings.jsx";
import Orders from "./pages/Account/Orders.jsx";
import ConfirmPayment from './pages/ConfirmPayment/ConfirmPayment.jsx'
import AdminPanel from "./pages/AdminPanel/AdminPanel.jsx";


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
