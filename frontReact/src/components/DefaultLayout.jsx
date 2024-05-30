import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
    Bars3Icon,
    UserIcon,
    XMarkIcon,
    HomeIcon,
} from "@heroicons/react/24/outline";
import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import {
    ClipboardDocumentCheckIcon,
    PowerIcon,
    UsersIcon,
} from "@heroicons/react/20/solid";

const navigation = [
    { name: "Accueil", to: "/defaultLayout/accueil" },
    { name: "Liste Employer", to: "/defaultLayout/liste" },
    { name: "Liste Payement", to: "/defaultLayout/payment" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ClientLayout() {
    const { currentUser, userToken } = useStateContext();
    //const [openProfil, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    if (!userToken) {
        return <Navigate to="/loginclient" />;
    }

    const logout = () => {
        navigate("/");
    };

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    <div className="flex items-center">
                                        <div className="flex ml-4 lg:ml-0">
                                            <img
                                                className="w-auto h-8"
                                                src="/logo2.jpg"
                                                alt="logo2"
                                                style={{
                                                    width: "80px",
                                                    height: "55px",
                                                }}
                                            />
                                        </div>

                                        <div className="hidden md:block">
                                            <div className="flex items-baseline ml-10 space-x-4">
                                                {navigation.map((item) => (
                                                    <NavLink
                                                        key={item.name}
                                                        to={item.to}
                                                        className={({
                                                            isActive,
                                                        }) =>
                                                            classNames(
                                                                isActive
                                                                    ? "bg-gray-900 text-white"
                                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                                "rounded-md px-3 py-2  text-sm font-medium"
                                                            )
                                                        }
                                                    >
                                                        <div className="flex items-center">
                                                            {item.name ===
                                                                "Accueil" && (
                                                                <HomeIcon className="w-5 h-5 mr-2" />
                                                            )}
                                                            {item.name ===
                                                                "Liste Employer" && (
                                                                <UsersIcon className="w-5 h-5 mr-2 " />
                                                            )}
                                                            {item.name ===
                                                                "Liste Payement" && (
                                                                <ClipboardDocumentCheckIcon className="w-5 h-5 mr-2" />
                                                            )}
                                                            {item.name}
                                                        </div>
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden md:block">
                                        <div className="flex items-center ml-4 md:ml-6">
                                            {/* Profile dropdown */}
                                            <Menu
                                                as="div"
                                                className="relative ml-3"
                                            >
                                                <div>
                                                    <Menu.Button className="relative flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">
                                                            Open user menu
                                                        </span>
                                                        <UserIcon className="w-6 h-6 text-white rounded-full" />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 w-40 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            <a
                                                                href="#"
                                                                onClick={
                                                                    openModal
                                                                }
                                                                className="flex items-center px-4 py-2 text-sm text-gray-700"
                                                            >
                                                                <PowerIcon className="w-5 h-5 mr-2 text-red-600 " />
                                                                <span>
                                                                    Déconnexion
                                                                </span>
                                                            </a>
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                        <Transition
                                            appear
                                            show={isOpen}
                                            as={Fragment}
                                        >
                                            <Dialog
                                                as="div"
                                                className="relative z-10"
                                                onClose={closeModal}
                                            >
                                                <Transition.Child
                                                    as={Fragment}
                                                    enter="ease-out duration-300"
                                                    enterFrom="opacity-0"
                                                    enterTo="opacity-100"
                                                    leave="ease-in duration-200"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <div
                                                        className="fixed inset-0 bg-black/25"
                                                        onClick={closeModal}
                                                    />
                                                </Transition.Child>

                                                <div className="fixed inset-0 overflow-y-auto">
                                                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                                                        <Transition.Child
                                                            as={Fragment}
                                                            enter="ease-out duration-300"
                                                            enterFrom="opacity-0 scale-95"
                                                            enterTo="opacity-100 scale-100"
                                                            leave="ease-in duration-200"
                                                            leaveFrom="opacity-100 scale-100"
                                                            leaveTo="opacity-0 scale-95"
                                                        >
                                                            <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                                                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                                                    <PowerIcon
                                                                        className="w-6 h-6 text-red-600"
                                                                        aria-hidden="true"
                                                                    />
                                                                </div>
                                                                <Dialog.Title
                                                                    as="h3"
                                                                    className="text-lg font-medium leading-6 text-gray-900"
                                                                >
                                                                    Voulez vous
                                                                    vraiment
                                                                    vous
                                                                    deconnecter?
                                                                </Dialog.Title>

                                                                <div className="mt-4">
                                                                    <button
                                                                        type="button"
                                                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                                                        onClick={(
                                                                            ev
                                                                        ) =>
                                                                            logout(
                                                                                ev
                                                                            )
                                                                        }
                                                                    >
                                                                        Oui
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="inline-flex justify-center px-4 py-2 mx-4 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                                        onClick={() => {
                                                                            closeModal();
                                                                        }}
                                                                    >
                                                                        Non
                                                                    </button>
                                                                </div>
                                                            </Dialog.Panel>
                                                        </Transition.Child>
                                                    </div>
                                                </div>
                                            </Dialog>
                                        </Transition>
                                    </div>
                                    {/* Profil */}

                                    <div className="flex -mr-2 md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">
                                                Open main menu
                                            </span>
                                            {open ? (
                                                <XMarkIcon
                                                    className="block w-6 h-6"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <Bars3Icon
                                                    className="block w-6 h-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                    {navigation.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.to}
                                            className={({ isActive }) =>
                                                classNames(
                                                    isActive
                                                        ? "bg-gray-900 text-white"
                                                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                    "block rounded-md px-3 py-2 text-base font-medium"
                                                )
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                                <div className="pt-4 pb-3 border-t border-gray-700">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <UserIcon className="w-6 h-6 text-white rounded-full" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">
                                                {currentUser.nom_entite}
                                            </div>
                                            <div className="text-sm font-medium leading-none text-gray-400">
                                                {currentUser.nif}
                                            </div>
                                            <div className="text-sm font-medium leading-none text-gray-400">
                                                <a
                                                    href="#"
                                                    onClick={openModal}
                                                    className="flex items-center px-4 py-2 text-sm text-white"
                                                >
                                                    <PowerIcon className="w-5 h-5 mr-2 text-red-600 " />
                                                    <span>Déconnexion</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <Outlet />
            </div>
        </>
    );
}
