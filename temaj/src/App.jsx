import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  HomePage,
  AboutPage,
  ContactPage,
  ProductPage,
  SingleProductPage,
  PrimaryPage,
  BrandPage,
  ReceiptPage,
  LoginPage,
  ProfilePage,
  WinDoorPage,
  ErrorPage,
  TermsPage,
  FaqPage,
  PolicyPage,
  SignupPage,
  OrderPage,
  WishListPage,
  WinCategoryPage,
  CartPage,
  SuccessPage,
  UpdatePassPage,
  ForgetPage,
  ResetPage,
  OrderPendingPage,
  PromotionPendingPage,
  LandingPage,
  OnSalePage,
  RefundPage,
} from "./pages";
import ProtectedRoutes from "./utils2/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/login"
          element={
            <Layout hideNavbar={true} hideFooter={true}>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout hideNavbar={true} hideFooter={true}>
              <SignupPage />
            </Layout>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Layout hideNavbar={true} hideFooter={true}>
              <ForgetPage />
            </Layout>
          }
        />
        <Route
          path="/reset-password"
          element={
            <Layout hideNavbar={true} hideFooter={true}>
              <ResetPage />
            </Layout>
          }
        />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<PrimaryPage />} />
                {/* <Route path="/" element={<LandingPage />} /> */}
                <Route path="/temaj-qeramik" element={<HomePage />} />
                <Route path="/temaj-windoor" element={<WinDoorPage />} />
                <Route
                  path="/temaj-windoor/category/:id"
                  element={<WinCategoryPage />}
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/receipt" element={<ReceiptPage />} />
                <Route path="/receipt/success" element={<SuccessPage />} />
                <Route path="/brands" element={<BrandPage />} />
                <Route path="/product/:id" element={<SingleProductPage />} />
                <Route
                  path="/policies/terms-of-conditions"
                  element={<TermsPage />}
                />
                <Route
                  path="/policies/refund-policy"
                  element={<RefundPage />}
                />
                <Route path="/policies/faq" element={<FaqPage />} />
                <Route
                  path="/policies/policy-privacy"
                  element={<PolicyPage />}
                />

                <Route element={<ProtectedRoutes />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route
                    path="/profile/change-password"
                    element={<UpdatePassPage />}
                  />
                  <Route path="/profile/orders" element={<OrderPage />} />
                  <Route path="/profile/wish-list" element={<WishListPage />} />
                  <Route path="/profile/pending-orders" element={<OrderPendingPage />} />
                  <Route path="/profile/on-sale" element={<OnSalePage />} />
                  <Route path="/profile/pending-promotion" element={<PromotionPendingPage />} />
                </Route>

                <Route path="/profile/cart" element={<CartPage />} />
                <Route path="/error" element={<ErrorPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
