import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function AuthLayout() {
  const { token } = useAuth();

  return (
    <>
      {token ? (
        <Navigate to="/" />
      ) : (
        <section className="container flex items-center">
          <div className="flex  h-screen w-full items-center justify-center md:w-1/2">
            <Outlet />
          </div>
          <div className="hidden md:block md:w-1/2  ">
            <img
              src="/images/white.png"
              className="h-screen w-full object-contain "
            />
          </div>
        </section>
      )}
    </>
  );
}

export default AuthLayout;
