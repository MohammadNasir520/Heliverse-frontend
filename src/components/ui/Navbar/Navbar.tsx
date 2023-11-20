import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../utils/jwt";
import { authKey, removeUserInfo } from "../../../utils/localStorage";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { userId } = getUserInfo() as any;
  console.log({ userId });

  const handleSignOut = () => {
    removeUserInfo(authKey);
    navigate("/login");
  };

  const navItems = [
    {
      title: "Home",
      to: "/",
    },
    {
      title: "My Teams",
      to: "/teams",
    },
  ];

  const signOption = (
    <div className=" lg:flex">
      {userId ? (
        <div
          onClick={handleSignOut}
          className={`cursor-pointer ${
            isMenuOpen
              ? "block px-1 py-1 mb-2 leading-loose text-center text-white  bg-blue-600 hover:bg-blue-700  rounded-xl  text-base   font-semibold"
              : "hidden lg:inline-block py-1 px-1 bg-blue-500 hover:bg-blue-600  text-white font-semibold rounded-sm transition duration-200 "
          }`}
        >
          SignOut
        </div>
      ) : (
        <>
          <Link
            to={"/login"}
            className={`${
              isMenuOpen
                ? "block px-1 py-1 mb-2 leading-loose text-center text-white  bg-blue-600 hover:bg-blue-700  rounded-xl  text-base   font-semibold"
                : "     hidden lg:inline-block py-1 px-1 bg-blue-500 hover:bg-blue-600  text-white font-semibold rounded-sm transition duration-200 "
            }`}
          >
            login
          </Link>
          <Link
            to={"/signup"}
            className={`${
              isMenuOpen
                ? "block mx-3  px-1 py-1 mb-2 leading-loose text-center text-white  bg-blue-600 hover:bg-blue-700  rounded-xl  text-base   font-semibold"
                : "     mx-3 hidden lg:inline-block py-1 px-1 bg-blue-500 hover:bg-blue-600  text-white font-semibold rounded-sm transition duration-200 "
            }`}
          >
            SignUp
          </Link>
        </>
      )}
    </div>
  );

  return (
    <div className="sticky inset-0 z-50 shadow-sm">
      <div className=" bg-white w-full text-black ">
        <nav className=" py-2  w-full flex justify-between items-center">
          <div>
            <Link to={"/"} className="text-xl font-semibold leading-none">
              <h4 className=" block   text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Heliverse
              </h4>
            </Link>
          </div>
          <div
            onClick={() => setMenuOpen(!isMenuOpen)}
            className={`${isMenuOpen ? "hidden" : "block"}  lg:hidden`}
          >
            <button className="navbar-burger flex items-center justify-end text-black p-3">
              <svg
                className="block h-4 w-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>open menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>

          {/* large screen Navbar options............... */}
          <div className="hidden  flex-1  flex justify-center items-center  text-black lg:flex lg:items-center lg:w-auto lg:space-x-4 text-lg    font-semibold ">
            {navItems?.map((navItem, i) => (
              <div key={i}>
                <NavLink
                  onClick={() => setMenuOpen(false)}
                  to={navItem?.to}
                  className={({
                    isActive,
                  }) => `  hover:border-b-2 border-[#c0c2c7]
                                         ${
                                           isActive
                                             ? "text-teal-600 border-b-2   border-[#c0c2c7] font-semibold "
                                             : `${
                                                 isMenuOpen
                                                   ? "lg:block p-4 text-lg   font-semibold text-black hover:bg-blue-50  rounded"
                                                   : "  text-black  "
                                               }  `
                                         }`}
                >
                  {navItem.title}
                </NavLink>
              </div>
            ))}
          </div>
          <div className="hidden lg:block  text-lg   font-semibold">
            {signOption}
          </div>
        </nav>

        {/* small screen................................ */}
        <div
          className={`navbar-menu  relative z-50  ${
            isMenuOpen ? "" : "hidden"
          }`}
        >
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
          <nav className="fixed bg-white top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 border-r overflow-y-auto ">
            <div className="flex items-center mb-8">
              <div className="flex items-center gap-2  ml-3">
                <Link to={"/"} className="text-xl font-semibold leading-none">
                  <h4 className=" block   text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    Helivers
                  </h4>
                </Link>
              </div>
              <Link
                to={"/"}
                className="mr-auto text-3xl text-black font-bold leading-none"
              ></Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="navbar-close"
              >
                <svg
                  className="h-6 w-6 text-black cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div>
              {/* small screen navbar options........................................... */}
              <ul className=" text-base   font-semibold ">
                {navItems?.map((navItem, i) => (
                  <li key={i}>
                    <NavLink
                      onClick={() => setMenuOpen(false)}
                      to={navItem?.to}
                      className={({ isActive }) =>
                        isActive
                          ? "text-teal-600 font-semibold p-4"
                          : `${
                              isMenuOpen
                                ? "block p-2 text-lg   font-semibold text-black hover:bg-blue-50 hover:text-black rounded"
                                : "text-lg   text-black hover:text-gray-500 "
                            }`
                      }
                    >
                      {navItem.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto">
              <div className="pt-6"> {signOption}</div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
