import { Fragment, useContext, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  MagnifyingGlassCircleIcon,
  DocumentCheckIcon,
  BanknotesIcon,
  HomeIcon,
  CursorArrowRaysIcon,
  Bars3Icon,
  UserIcon,
  XMarkIcon,
  Cog8ToothIcon,
  LinkIcon,
  KeyIcon,
  BookmarkIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";

import Logo from "../assets/logo.png";
import { signOutAUser } from "../utils/auth";
import Avatar from "react-avatar";
import { AuthContext } from "../context/AuthContext";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/dashboard/home", icon: HomeIcon, current: true },
  // { name: "User", href: "/dashboard/user", icon: UserIcon, current: false },
  {
    name: "Pricing",
    href: "/dashboard/pricing",
    icon: BanknotesIcon,
    current: false,
  },
  {
    name: "Browse Brands",
    href: "/dashboard/browse-brands",
    icon: MagnifyingGlassCircleIcon,
    current: false,
  },
  {
    name: "Creator Kollaborate",
    href: "/dashboard/creator-kollaborate",
    icon: CursorArrowRaysIcon,
    current: false,
  },
  {
    name: "Create Contract",
    href: "/dashboard/create-contract",
    icon: DocumentCheckIcon,
    current: false,
  },
  {
    name: "My Socials",
    href: "/dashboard/my-socials",
    icon: LinkIcon,
    current: false,
  },
  {
    name: "Saved Leads",
    href: "/dashboard/saved-leads",
    icon: BookmarkIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const { currentUser, userData, loading } = useContext(AuthContext);
  const userNavigation = [
    {
      name: "Your Profile",
      callback: () => router.push("/dashboard/user/profile"),
      icon: UserIcon,
    },
    {
      name: "Saved Leads",
      callback: () => router.push("/dashboard/user/saved-leads"),
      icon: BookmarkIcon,
    },
    {
      name: "My Socials",
      callback: () => router.push("/dashboard/user/my-socials"),
      icon: LinkIcon,
    },
    {
      name: "Settings",
      callback: () => router.push("/dashboard/user/settings"),
      icon: Cog8ToothIcon,
    },
    {
      name: "Sign out",
      callback: () => {
        signOutAUser();
      },
      icon: KeyIcon,
    },
  ];

  return (
    <div className=''>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 flex z-40 md:hidden'
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 -mr-12 pt-2'>
                  <button
                    type='button'
                    className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XMarkIcon
                      className='h-6 w-6 text-white'
                      aria-hidden='true'
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex-shrink-0 flex items-center px-4'>GM</div>
              <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                <nav className='px-2 space-y-1'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "mr-4 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden='true'
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 p-2 bg-gray-100'>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className='flex flex-col flex-grow p-2 rounded-xl border-r border-gray-200 pt-5 bg-white overflow-y-auto'>
          <div className='flex items-center flex-shrink-0 px-4'>
            <Image height={50} width={50} src={Logo} alt='Logo' />
            <h1 className='font-semibold text-3xl pl-2'>GM</h1>
          </div>
          <div className='mt-5 flex-grow flex flex-col'>
            <nav className='flex-1 px-2 pb-4 space-y-1'>
              {navigation.map((item) => (
                <Link
                  className={classNames(
                    router.pathname === item.href
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                  key={item.name}
                  href={item.href}
                >
                  <item.icon
                    className={classNames(
                      router.pathname === item.href
                        ? "text-white"
                        : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden='true'
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className='md:pl-64 flex flex-col flex-1 p-2 bg-gray-100'>
        <div className='sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow'>
          <button
            type='button'
            className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
          <div className='flex-1 px-4 flex justify-between'>
            <div className='flex-1 flex'>
              <form className='w-full flex md:ml-0' action='#' method='GET'>
                <label htmlFor='search-field' className='sr-only'>
                  Search
                </label>
                <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                  <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
                    <MagnifyingGlassIcon
                      className='h-5 w-5'
                      aria-hidden='true'
                    />
                  </div>
                  <input
                    /*Need to integtate Meilisearch -  prathmeshsadake@gmail.com*/
                    id='search-field'
                    className='block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm'
                    placeholder='Search'
                    type='search'
                    name='search'
                  />
                </div>
              </form>
            </div>
            <div className='ml-4 flex items-center md:ml-6'>
              <button
                type='button'
                className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                <span className='sr-only'>View notifications</span>
                <BellIcon className='h-6 w-6' aria-hidden='true' />
              </button>
              {/* <button
                type='button'
                className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                <span className='sr-only'>Settings</span>
                <Cog8ToothIcon className='h-6 w-6' aria-hidden='true' />
              </button> */}

              {/* Profile dropdown */}
              <Menu as='div' className='ml-3 relative'>
                <div>
                  <Menu.Button className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                    <span className='sr-only'>Open user menu</span>
                    <Avatar
                      size='32'
                      round={true}
                      name={userData.userName}
                      src={userData.userPhotoLink}
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <button
                            onClick={item.callback}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex items-center w-full text-left cursor-pointer px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                router.pathname === item.href
                                  ? "text-blue-500"
                                  : "text-gray-500 group-hover:text-gray-600",
                                "mr-2 flex-shrink-0 h-4 w-4"
                              )}
                            />
                            {item.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main className='flex-1 bg-white mt-2 min-h-screen'>
          <div className='py-6'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
              {/* Replace with your content */}
              {children}
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
