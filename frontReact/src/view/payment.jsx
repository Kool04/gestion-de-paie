import {
    CheckIcon,
    DocumentArrowDownIcon,
    ExclamationCircleIcon,
    TrashIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { Transition, Dialog } from "@headlessui/react";
import { NavLink } from "react-router-dom";

export default function Payment() {
    const [payment, setPayment] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal2() {
        setIsOpen2(false);
    }

    function openModal2() {
        setIsOpen2(true);
    }

    useEffect(() => {
        fetchPayment();
        document.title = "Paiement- Gestion de payement";
    }, []);

    const fetchPayment = async () => {
        try {
            const result = await axios.get(
                "http://127.0.0.1:8000/api/listePayment/"
            );
            setPayment(result.data.results);
        } catch (err) {
            console.log("erreur", err);
        }
    };

    const handleDelete = async (num_payment) => {
        try {
            console.log(num_payment);
            await axios.delete(
                `http://127.0.0.1:8000/api/supprimerPayment/${num_payment}`
            );
            setPayment((prevPayments) =>
                prevPayments.filter((item) => item.num_payment !== num_payment)
            );
        } catch (err) {
            console.error("Erreur lors de la suppression du paiement", err);
        }
    };

    const handleDeleteButtonClick = (num_payment) => {
        console.log(num_payment);
        setSelectedPayment(num_payment);
        openModal();
    };

    return (
        <>
            <main>
                <div className="max-w-sm mx-auto sm:px-6 lg:px-8">
                    <SearchBar
                        placeholder="recherche..."
                        updateKeyword={setSearchKeyword}
                        data={payment}
                        updateFilteredData={setFilteredUsers}
                    />
                </div>
                <div className="max-w-screen-xl px-4 py-2 mx-auto mt-3 bg-white border-gray-400 shadow-xl sm:px-10 lg:px-15 rounded-2xl ">
                    <table className="w-full mt-4 mb-10 border-collapse">
                        <thead>
                            <tr className="text-sm font-medium leading-6 text-gray-900 border-b border-gray-300">
                                <th className="w-5">numero payment</th>
                                <th className="w-25">numero employer</th>
                                <th className="w-5">Type</th>
                                <th className="w-15">Montant(AR)</th>
                                <th className="w-15">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(filteredUsers.length > 0
                                ? filteredUsers
                                : payment
                            )
                                .filter(
                                    (payment) =>
                                        (payment.num_payment &&
                                            payment.num_payment
                                                .toString()
                                                .includes(
                                                    searchKeyword.toLowerCase()
                                                )) ||
                                        (payment.num_emp &&
                                            payment.num_emp
                                                .toString()
                                                .includes(
                                                    searchKeyword.toLowerCase()
                                                ))
                                )
                                .map((item) => (
                                    <tr
                                        key={item.num_payment}
                                        className="text-sm text-gray-700 border-b border-gray-300"
                                    >
                                        <td className="w-10 py-2 pl-4 pr-4 text-center">
                                            {item.num_payment}
                                        </td>
                                        <td className="w-10 py-2 pl-4 pr-4 text-center">
                                            {item.num_emp}
                                        </td>
                                        <td className="w-5 py-2 pl-4 pr-4 text-center">
                                            {item.type}
                                        </td>
                                        <td className="w-10 py-2 pl-4 pr-4 text-center">
                                            {item.montant}
                                        </td>
                                        <td className="w-10 py-2 pl-4 pr-4 text-center">
                                            {item.date}
                                        </td>
                                        <td className="w-10 py-2">
                                            <div className="flex mt-5 lg:ml-4 lg:mt-0">
                                                <p className="text-sm leading-6 text-gray-900">
                                                    <button type="button">
                                                        <NavLink
                                                            to={`/defaultLayout/payment/pdf/${item.num_emp}/${item.num_payment}`}
                                                        >
                                                            <DocumentArrowDownIcon
                                                                className="w-8 h-8 text-blue-500 "
                                                                aria-hidden="true"
                                                            />
                                                        </NavLink>
                                                    </button>
                                                </p>
                                                <p className="text-sm leading-6 text-gray-900">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDeleteButtonClick(
                                                                item.num_payment
                                                            )
                                                        }
                                                    >
                                                        <TrashIcon
                                                            className="text-red-600 w-7 h-7 "
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                </p>
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
                                                                onClick={
                                                                    closeModal
                                                                }
                                                            />
                                                        </Transition.Child>

                                                        <div className="fixed inset-0 overflow-y-auto">
                                                            <div className="flex items-center justify-center min-h-full p-4 text-center">
                                                                <Transition.Child
                                                                    as={
                                                                        Fragment
                                                                    }
                                                                    enter="ease-out duration-300"
                                                                    enterFrom="opacity-0 scale-95"
                                                                    enterTo="opacity-100 scale-100"
                                                                    leave="ease-in duration-200"
                                                                    leaveFrom="opacity-100 scale-100"
                                                                    leaveTo="opacity-0 scale-95"
                                                                >
                                                                    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                                                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                                                            <ExclamationCircleIcon
                                                                                className="w-6 h-6 text-red-600"
                                                                                aria-hidden="true"
                                                                            />
                                                                        </div>
                                                                        <Dialog.Title
                                                                            as="h3"
                                                                            className="text-lg font-medium leading-6 text-gray-900"
                                                                        >
                                                                            voulez
                                                                            vous
                                                                            vraiment
                                                                            supprimer
                                                                            ce
                                                                            payment?
                                                                        </Dialog.Title>

                                                                        <div className="mt-4">
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                                                                onClick={async () => {
                                                                                    await handleDelete(
                                                                                        selectedPayment
                                                                                    );
                                                                                    setIsOpen(
                                                                                        false
                                                                                    );
                                                                                    setSelectedPayment(
                                                                                        null
                                                                                    );
                                                                                    closeModal();
                                                                                    openModal2();
                                                                                }}
                                                                            >
                                                                                Confirmer
                                                                                la
                                                                                suppression
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex justify-center px-4 py-2 mx-4 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                                                onClick={() => {
                                                                                    closeModal();
                                                                                }}
                                                                            >
                                                                                Annuler
                                                                            </button>
                                                                        </div>
                                                                    </Dialog.Panel>
                                                                </Transition.Child>
                                                            </div>
                                                        </div>
                                                    </Dialog>
                                                </Transition>
                                                <Transition
                                                    appear
                                                    show={isOpen2}
                                                    as={Fragment}
                                                >
                                                    <Dialog
                                                        as="div"
                                                        className="relative z-10"
                                                        onClose={closeModal2}
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
                                                                onClick={
                                                                    closeModal2
                                                                }
                                                            />
                                                        </Transition.Child>

                                                        <div className="fixed inset-0 overflow-y-auto">
                                                            <div className="flex items-center justify-center min-h-full p-4 text-center">
                                                                <Transition.Child
                                                                    as={
                                                                        Fragment
                                                                    }
                                                                    enter="ease-out duration-300"
                                                                    enterFrom="opacity-0 scale-95"
                                                                    enterTo="opacity-100 scale-100"
                                                                    leave="ease-in duration-200"
                                                                    leaveFrom="opacity-100 scale-100"
                                                                    leaveTo="opacity-0 scale-95"
                                                                >
                                                                    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                                                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                                                            <CheckIcon
                                                                                className="w-6 h-6 text-green-600"
                                                                                aria-hidden="true"
                                                                            />
                                                                        </div>
                                                                        <Dialog.Title
                                                                            as="h3"
                                                                            className="text-lg font-medium leading-6 text-gray-900"
                                                                        >
                                                                            Payment
                                                                            supprimer
                                                                        </Dialog.Title>

                                                                        <div className="mt-4">
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                                                                onClick={() => {
                                                                                    closeModal2();
                                                                                }}
                                                                            >
                                                                                OK
                                                                            </button>
                                                                        </div>
                                                                    </Dialog.Panel>
                                                                </Transition.Child>
                                                            </div>
                                                        </div>
                                                    </Dialog>
                                                </Transition>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}
