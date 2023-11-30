import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Navbar from "../ui/Navbar";
import MainCart from "../features/user/components/MainCart";
import { useState } from "react";

function AppLayout() {
  const { token } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const handleClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
      {!token ? (
        <Navigate to="/login" />
      ) : (
        <section className="container max-w-screen-lg ">
          <Navbar />
          <div className="grid grid-cols-12 gap-y-8 py-12">
            <button
              onClick={handleClick}
              className=" btn btn-primary col-span-12 w-full md:hidden"
            >
              My Profile
            </button>

            <div
              className={`col-span-12  md:col-span-4 md:block ${
                !showProfile ? "hidden" : ""
              }`}
            >
              <MainCart />
            </div>
            <div className="col-span-12 md:col-span-8">
              <Outlet />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default AppLayout;
