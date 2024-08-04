import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function NavigationBar() {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Breeds", href: "/cat-breeds" },
    // Diisi dengan href page mail/chat 
    // { name: "Mail", href: "/cat-breeds" },
  ];
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Disclosure
      as="nav"
      className="bg-light-first text-light-fourth shadow-md shadow-gray-300 fixed top-0 right-0 left-0"
    >
      <div className="mx-5 xl:mx-20 px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400  focus:outline-none  focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <h1 className="font-medium text-2xl">Cat Adoption</h1>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex self-center ml-5 space-x-4 gap-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      (isActive ? "text-light-third " : "text-light-fourth ") +
                      "text-xl font-semibold  transition duration-300 ease-in-out hover:text-sub "
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            {!localStorage.getItem("token") ? (
              <Link
                to={"/login"}
                className="bg-light-third rounded-md py-2 px-4 text-white text-sm shadow-md"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Menambahkan icon mail untuk chat */}
                <Link to={"/chat"}
                  className="relative border-none flex text-sm">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Chat</span>
                  <svg
                    className="h-8 w-8 "
                    fill="#213555"
                    width="800px"
                    height="800px"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <g>
                        <path d="M496.327,127.091l-15.673,9.613L281.83,258.623c-7.983,4.859-16.917,7.293-25.84,7.293s-17.826-2.424-25.778-7.262
			l-0.136-0.084L31.347,134.771l-15.673-9.759L0,115.242v302.717h512V117.488L496.327,127.091z"/>
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M25.245,94.041l25.161,15.673l25.161,15.673l171.008,106.527c5.841,3.521,13.082,3.511,18.913-0.042l173.652-106.486
			l25.558-15.673l25.558-15.673H25.245z"/>
                      </g>
                    </g>
                  </svg>
                </Link>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative border-none flex text-sm ">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <svg
                        className="h-8 w-8"
                        fill="#213555"
                        width="800px"
                        height="800px"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z" />
                      </svg>
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-light-first py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <Link
                        to={"/cats"}
                        className="block px-4 py-2 text-sm text-light-fourth font-medium  data-[focus]:text-light-third"
                      >
                        Your Cats
                      </Link>
                    </MenuItem>

                    <MenuItem>
                      <a
                        className="block px-4 py-2 text-sm text-light-fourth font-medium  data-[focus]:text-light-third"
                        onClick={logout}
                      >
                        Sign out
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>

            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={NavLink}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-light-second text-white"
                  : "text-light-third hover:bg-light-second hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
