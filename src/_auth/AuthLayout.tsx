import { Navigate, Outlet } from "react-router-dom";

import ThemeBtn from "@/components/shared/ThemeBtn";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10 relative">
            <ThemeBtn sz="icon" className="absolute top-1 left-1" />

            <Outlet />
          </section>

          <img
            src="/assets/images/side-img.png"
            alt="Auth image"
            className="hidden lg:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
