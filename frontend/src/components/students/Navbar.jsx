import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const {navigate, isEducator} = useContext(AppContext)
  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div
      className={`flex items-center justify-between flex-wrap px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
      onClick={() => navigate('/')}
        src={assets.logo}
        alt="Website Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />

      {/* Desktop View */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        {user && (
          <div className="flex items-center gap-5">
            <button  onClick= {() => navigate('/educator')} aria-label="Become an Educator">{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
            <span>|</span>
            <Link to="/my-enrollments">My Enrollments</Link>
          </div>
        )}
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-700 text-white rounded-full px-5 py-2"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        {user && (
          <div className="flex items-center gap-2">
          <button  onClick= {() => navigate('/educator')} aria-label="Become an Educator">{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
          <span>|</span>
            <Link to="/my-enrollments">My Enrollments</Link>
          </div>
        )}

        {/* User Icon Button */}
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img
              src={assets.user_icon}
              alt="User Login"
              className="w-8 h-8"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
