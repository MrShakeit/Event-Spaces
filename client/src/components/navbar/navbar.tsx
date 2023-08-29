import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const Navbar: React.FC = () => {
  const authContext = useAuth();

  const handleSignOut = () => {
    authContext.signOut();
  };
  console.log(authContext.status);

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
          {authContext.status === "authenticated" ? (
            <div className="flex items-center space-x-4 pr-8">
              <span className="text-sm font-medium leading-6 text-gray-900">
                Welcome {authContext.user?.name.first}
              </span>
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
// const SignInOutBtn = () => {
//   const { user, signOut } = useAuth();

//   const handleSignOut = () => {
//     signOut();
//   };

//   return (
//     <>
//       {user ? (
//         <>
//           <Link to="/" className="nav-link">
//             <span className="text-sm font-medium leading-6 text-gray-900">
//               Dashboard
//             </span>
//           </Link>
//           <button className="btn" onClick={handleSignOut}>
//             Sign Out
//           </button>
//         </>
//       ) : (
//         <ul className="flex space-x-4 gap-8 pr-8">
//           <li>
//             <Link to="/auth/signup" className="nav-link">
//               <span className="text-sm font-medium leading-6 text-gray-900">
//                 Sign Up
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/auth/signin" className="nav-link">
//               <span className="text-sm font-medium leading-6 text-gray-900">
//                 Sign In
//               </span>
//             </Link>
//           </li>
//         </ul>
//       )}
//     </>
//   );
// };

// const Topbar = () => {
//   const { user, status, signOut } = useAuth();
//   const navigate = useNavigate();

//   const handleSignOut = () => {
//     signOut();
//     navigate("/"); // Redirect to the homepage after sign-out
//   };

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="container mx-auto py-2 flex justify-between items-center">
//         <Link to="/" className="navbar-brand">
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Valenzuela_Seal.svg/2048px-Valenzuela_Seal.svg.png"
//             className="w-20 h-20 pt-1 pl-1"
//             alt="Government Office Logo"
//           />
//         </Link>
//         <div>
//           {status === "authenticated" ? (
//             <div className="flex items-center space-x-4 pr-8">
//               <span className="text-sm font-medium leading-6 text-gray-900">
//                 Welcome, {user?.name.first}
//               </span>
//               <button className="btn" onClick={handleSignOut}>
//                 Sign Out
//               </button>
//             </div>
//           ) : (
//             <SignInOutBtn />
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Topbar;
