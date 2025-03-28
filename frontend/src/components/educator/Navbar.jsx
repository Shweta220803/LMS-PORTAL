import React from "react";
import { assets } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
      <Link to="/">
        {assets.logo && <img src={assets.logo} className="w-28 lg:w-32" alt="logo" />}
      </Link>

      <div className="flex items-center gap-5 text-gray-500 relative">
        <p>Hi! {user ? user.fullName : "Developers"}</p>
        {user ? (
          <UserButton />
        ) : (
          assets.profile_img && <img className="w-8" src={assets.profile_img} alt="profile" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
