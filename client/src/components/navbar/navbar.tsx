import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const Navbar: React.FC = () => {
  const { permissionFlags, signOut, status } = useAuth();

  const handleSignOut = () => {
    signOut();
  };
  console.log(status);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto py-2 flex justify-between items-center">
        <Link to="/" className="navbar-brand">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Valenzuela_Seal.svg/2048px-Valenzuela_Seal.svg.png"
            className="w-20 h-20 pt-1 pl-1"
            alt="Government Office Logo"
          />
        </Link>
        <div>
          {status === "authenticated" ? (
            <div className="flex items-center space-x-4 pr-8">
              {permissionFlags === 12 && (
                <>
                  <Link to="/admin" className="nav-link">
                    <span className="text-sm font-medium leading-6 text-gray-900">
                      Admin
                    </span>
                  </Link>
                  <Link to="/admin/users" className="nav-link">
                    <span className="text-sm font-medium leading-6 text-gray-900">
                      Users
                    </span>
                  </Link>
                  <Link to="/admin/spaces" className="nav-link">
                    <span className="text-sm font-medium leading-6 text-gray-900">
                      Spaces
                    </span>
                  </Link>
                  <Link to="/admin/bookings" className="nav-link">
                    <span className="text-sm font-medium leading-6 text-gray-900">
                      Bookings
                    </span>
                  </Link>
                </>
              )}

              <span className="text-sm font-medium leading-6 text-gray-900">
                <button className="btn" onClick={handleSignOut}>
                  Sign Out
                </button>
              </span>
            </div>
          ) : (
            <ul className="flex space-x-4 gap-8 pr-8">
              <li>
                <Link to="/auth/signup" className="nav-link">
                  <span className="text-sm font-medium leading-6 text-gray-900">
                    Sign Up
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/auth/signin" className="nav-link">
                  <span className="text-sm font-medium leading-6 text-gray-900">
                    Sign In
                  </span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
