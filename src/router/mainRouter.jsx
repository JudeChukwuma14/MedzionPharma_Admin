import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Spinners from "../components/reuse/Spinner";
import ProtectedRoute from "./protectedRoute";
import AuthRouter from "./AuthRouter";
import ScrollToTop from "../components/reuse/ScrollToTop";
// eslint-disable-next-line no-unused-vars
const withSuspense = (Component) => (
  <Suspense fallback={<Spinners />}>
    <Component />
  </Suspense>
);

const SignIn = lazy(() => import("../page/SignIn"));
const SignUp = lazy(() => import("../page/SignUp"));
const CreatePost = lazy(() => import("../page/CreatePost"));
const CreateProduct = lazy(() => import("../page/CreateProduct"));
const Dashboard = lazy(() => import("../page/Dashboard"));
const MediaList = lazy(() => import("../page/MediaList"));
const OrderDetails = lazy(() => import("../page/OrderDetails"));
const OrderList = lazy(() => import("../page/OrderList"));
const PageList = lazy(() => import("../page/PageList"));
const PostList = lazy(() => import("../page/PageList"));
const ProductList = lazy(() => import("../page/ProductList"));
const ProdcutDetails = lazy(() => import("../page/ProductDetails"));

const routesConfig = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />,
        <ScrollToTop/>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: withSuspense(Dashboard),
      },
      {
        path: "/content/posts/create",
        element: withSuspense(CreatePost),
      },
      {
        path: "/products/create",
        element: withSuspense(CreateProduct),
      },

      {
        path: "/content/media",
        element: withSuspense(MediaList),
      },
      {
        path: "/order-details",
        element: withSuspense(OrderDetails),
      },
      {
        path: "/orders",
        element: withSuspense(OrderList),
      },
      {
        path: "/content/pages",
        element: withSuspense(PageList),
      },
      {
        path: "/content/posts",
        element: withSuspense(PostList),
      },
      {
        path: "/products",
        element: withSuspense(ProductList),
      },
      
      {
        path: "/product-details/:id",
        element: withSuspense(ProdcutDetails),
      },     
    ],
  },
  {
    path: "/signup",
    element: <AuthRouter>{withSuspense(SignUp)}</AuthRouter>,
  },
  {
    path: "/signin",
    element: <AuthRouter>{withSuspense(SignIn)}</AuthRouter>,
  },
];

export const mainRouter = createBrowserRouter(routesConfig);
