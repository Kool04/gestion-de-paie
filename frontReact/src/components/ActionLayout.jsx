import { Dialog, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";

export default function MyModal() {
    let [isOpen, setIsOpen] = useState(true);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="px-4 py-2 text-sm font-medium text-white rounded-md bg-black/20 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                    Open dialog
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
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
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Payment successful
                                    </Dialog.Title>
                                    <form
                                        action="#"
                                        method="POST"
                                        className="max-w-xl mx-auto mt-16 sm:mt-20"
                                    >
                                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="first-name"
                                                    className="block text-sm font-semibold leading-6 text-gray-900"
                                                >
                                                    First name
                                                </label>
                                                <div className="mt-2.5">
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="last-name"
                                                    className="block text-sm font-semibold leading-6 text-gray-900"
                                                >
                                                    Last name
                                                </label>
                                                <div className="mt-2.5">
                                                    <input
                                                        type="text"
                                                        name="last-name"
                                                        id="last-name"
                                                        autoComplete="family-name"
                                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label
                                                    htmlFor="company"
                                                    className="block text-sm font-semibold leading-6 text-gray-900"
                                                >
                                                    Company
                                                </label>
                                                <div className="mt-2.5">
                                                    <input
                                                        type="text"
                                                        name="company"
                                                        id="company"
                                                        autoComplete="organization"
                                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label
                                                    htmlFor="email"
                                                    className="block text-sm font-semibold leading-6 text-gray-900"
                                                >
                                                    Email
                                                </label>
                                                <div className="mt-2.5">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        autoComplete="email"
                                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label
                                                    htmlFor="phone-number"
                                                    className="block text-sm font-semibold leading-6 text-gray-900"
                                                >
                                                    Phone number
                                                </label>
                                                <div className="relative mt-2.5">
                                                    <div className="absolute inset-y-0 left-0 flex items-center">
                                                        <label
                                                            htmlFor="country"
                                                            className="sr-only"
                                                        >
                                                            Country
                                                        </label>
                                                        <select
                                                            id="country"
                                                            name="country"
                                                            className="h-full py-0 pl-4 text-gray-400 bg-transparent border-0 rounded-md bg-none pr-9 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                        >
                                                            <option>US</option>
                                                            <option>CA</option>
                                                            <option>EU</option>
                                                        </select>
                                                        <ChevronDownIcon
                                                            className="absolute top-0 w-5 h-full text-gray-400 pointer-events-none right-3"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        name="phone-number"
                                                        id="phone-number"
                                                        autoComplete="tel"
                                                        className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label
                                                    htmlFor="message"
                                                    className="block text-sm font-semibold leading-6 text-gray-900"
                                                >
                                                    Message
                                                </label>
                                                <div className="mt-2.5">
                                                    <textarea
                                                        name="message"
                                                        id="message"
                                                        rows={4}
                                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        defaultValue={""}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
