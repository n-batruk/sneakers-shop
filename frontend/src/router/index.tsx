import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "../pages/main";
import ProductPage from "../pages/product";
import OrderPage from "@/pages/order";
import LoginPage from "@/pages/login";
import RegistrationPage from "@/pages/registration";
import { useUserStore } from "@/store/user.store";
import AdminPage from "@/pages/admin";

export const RouterRoutes = () => {
  const [user, token] = useUserStore((state) => [state.user, state.token]);
  return (
    <Routes>
      {user?.account_role === "ADMIN" ? (
        <Route path="/" element={<AdminPage />} />
      ) : null}

      {user?.account_role === "CLIENT" || !token ? (
        <>
          <Route path="/" element={<MainPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </>
      ) : null}

      {!token ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </>
      ) : null}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
