import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";

const NavigationBar = () => {
  const navigate = useNavigate();
  const pages = [
    "Home",
    "All Product",
    "Discover",
    "Pricing",
    "Blog",
    "My Account ",
  ];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    setMenuOpen(!menuOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    setMenuOpen(false);
    switch (page) {
      case "MY ACCOUNT":
        navigate("/manageusers");
        break;
      case "Home":
        navigate("./home");
        break;
      case "DISCOVER":
        console.log("DISCOVER CLICKED");
        break;
      case "BLOG":
        console.log("BLOG CLICKED");
        break;
      case "PRICING":
        console.log("PRICING CLICKED");
        break;
      case "ALL PRODUCT":
        navigate("./softwareopencard");
        break;
      default:
        navigate("./softwareopencard");
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <nav className="bg-[#ffffff] shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <a
                href="#app-bar-with-responsive-menu"
                className="text-black font-bold text-xl"
              >
                Blurock Innovations
              </a>
            </div>
            <div className="md:hidden">
              <a
                href="#app-bar-with-responsive-menu"
                className="text-black font-bold text-lg"
              >
                Blurock
              </a>
            </div>
          </div>
          <div className="hidden md:flex md:space-x-4">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                className="text-black"
              >
                {page}
              </button>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={handleOpenNavMenu} className="text-black">
              {menuOpen ? (
                <IoClose className="h-6 w-6" />
              ) : (
                <CiMenuFries className="h-6 w-6" />
              )}
            </button>
          </div>
          {/* <div className="flex items-center">
            <div className="relative">
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <ul>
                  {settings.map((setting) => (
                    <li key={setting}>
                      {({ active }) => (
                        <button
                          onClick={handleCloseUserMenu}
                          className={`${
                            active ? "bg-gray-100" : ""
                          } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          {setting}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {pages.map((page) => (
              <a
                key={page}
                href="#"
                onClick={() => handleCloseNavMenu(page)}
                className="block px-3 py-2 rounded-md text-base font-medium text-black"
              ></a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
