import { Fragment, useEffect, useState } from "react";
import {
    BriefcaseIcon,
    CheckIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    KeyIcon,
    PhoneArrowDownLeftIcon,
    TrashIcon,
} from "@heroicons/react/20/solid";

import axios from "axios";
import { Transition, Dialog } from "@headlessui/react";
import SearchBar from "../components/SearchBar";
import { NavLink } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
//import { NavLink } from "react-router-dom";

export default function Liste() {
    const [allUsers, setAllcountry] = useState([]);

    const [error, setError] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [selectedEmp, setSelectedEmp] = useState(null);

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
        fetchData();
    }, []);

    useEffect(() => {
        document.title = "Liste- Gestion de payement"; // Mettez ici le titre que vous souhaitez
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios("http://127.0.0.1:8000/api/liste");

            const userDataArray = Array.isArray(result.data.results)
                ? result.data.results
                : [result.data.results];

            setAllcountry(userDataArray);
        } catch (err) {
            console.log("erreur");
            setError(
                "Une erreur s'est produite lors de la récupération des données. Veuillez réessayer plus tard."
            );
        }
    };

    const handleDelete = async (num_emp) => {
        console.log(num_emp);

        await axios.delete("http://127.0.0.1:8000/api/supprimer/" + num_emp);

        setAllcountry((prevAllUsers) =>
            prevAllUsers.filter((item) => item.num_emp !== num_emp)
        );
    };

    const handleDeleteButtonClick = (num_emp) => {
        setSelectedEmp(num_emp);
        openModal();
    };

    return (
        <>
            <header className="bg-white shadow">
                <div className="px-4 py-2 mx-auto max-w-7xl xl:px-20 lg:px-20">
                    <div className="lg:flex lg:items-center lg:justify-between">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                Liste des Employers:
                            </h2>
                        </div>
                        <div className="flex mt-5 lg:ml-4 lg:mt-0">
                            <span className="sm:ml-3">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <NavLink
                                        to="/defaultLayout/Ajouter"
                                        className="flex items-center"
                                    >
                                        <PlusIcon
                                            className="-ml-0.5 mr-1.5 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        Ajouter nouveau employer
                                    </NavLink>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>

                {/* en tete*/}
            </header>
            <main className="max-w-4xl px-4 py-3 mx-auto mt-3 bg-white shadow lg:px-8 ">
                <div className="max-w-sm mx-auto sm:px-6 lg:px-8">
                    <SearchBar
                        placeholder="recherche..."
                        data={allUsers}
                        updateFilteredData={setFilteredUsers}
                        updateKeyword={setSearchKeyword}
                    />
                </div>
                {error && (
                    <div className="p-4 mt-4 text-white bg-red-500">
                        <p>{error}</p>
                    </div>
                )}

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <ul role="list" className="divide-y divide-gray-100">
                        {(filteredUsers.length > 0 ? filteredUsers : allUsers)
                            .filter(
                                (employe) =>
                                    (employe.nom &&
                                        employe.nom
                                            .toLowerCase()
                                            .includes(
                                                searchKeyword.toLowerCase()
                                            )) ||
                                    (employe.num_emp &&
                                        employe.num_emp
                                            .toString()
                                            .includes(
                                                searchKeyword.toLowerCase()
                                            ))
                            )

                            .map(
                                (employe) => (
                                    console.log(
                                        "Contenu de photo_path :",
                                        employe.photo_path
                                    ), // Ajout de cette ligne
                                    (
                                        <li
                                            key={employe.num_emp}
                                            className="flex justify-between py-5 gap-x-6"
                                        >
                                            <div className="flex min-w-0 gap-x-4">
                                                <img
                                                    className="flex-none w-12 h-12 rounded-full bg-gray-50"
                                                    src={`http://localhost:8000${employe.photo_path}`}
                                                    alt=""
                                                />
                                                <div className="flex-auto min-w-0">
                                                    <p className="font-semibold leading-6 text-gray-900 text-x">
                                                        {employe.nom}{" "}
                                                        {employe.prenom}
                                                    </p>
                                                    <p className="flex items-center mt-1 text-xs leading-5 text-gray-500 truncate">
                                                        <KeyIcon
                                                            className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
                                                            aria-hidden="true"
                                                        />
                                                        <u>numero employe:</u>
                                                        {"  "}
                                                        {employe.num_emp} <br />
                                                    </p>
                                                    <p className="flex items-center text-xs leading-5 text-gray-500 truncate">
                                                        <PhoneArrowDownLeftIcon
                                                            className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
                                                            aria-hidden="true"
                                                        />
                                                        <u>telephone:</u>{" "}
                                                        {employe.num_tel} <br />
                                                    </p>
                                                    <p className="flex items-center text-xs leading-5 text-gray-500 truncate">
                                                        <BriefcaseIcon
                                                            className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
                                                            aria-hidden="true"
                                                        />
                                                        <u>poste:</u>{" "}
                                                        {employe.poste}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                <div className="flex mt-5 lg:ml-4 lg:mt-0">
                                                    <p className="text-sm leading-6 text-gray-900">
                                                        <button type="button">
                                                            <NavLink
                                                                to={`/defaultLayout/info/${employe.num_emp}`}
                                                            >
                                                                <InformationCircleIcon
                                                                    className="w-8 h-8 text-gray-500 "
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
                                                                    employe.num_emp
                                                                )
                                                            }
                                                        >
                                                            <TrashIcon
                                                                className="text-red-600 w-7 h-7 "
                                                                aria-hidden="true"
                                                            />
                                                        </button>
                                                    </p>
                                                </div>
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
                                                                        <ExclamationCircleIcon
                                                                            className="w-6 h-6 text-red-600"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </div>
                                                                    <Dialog.Title
                                                                        as="h3"
                                                                        className="text-lg font-medium leading-6 text-gray-900"
                                                                    >
                                                                        Êtes-vous
                                                                        sûr de
                                                                        vouloir
                                                                        supprimer
                                                                        cette
                                                                        employer
                                                                        ?
                                                                    </Dialog.Title>
                                                                    <div className="mt-2">
                                                                        <p className="text-sm text-gray-500">
                                                                            si
                                                                            vous
                                                                            supprimer
                                                                            cet
                                                                            employer
                                                                            ca
                                                                            supprimera
                                                                            aussi
                                                                            tout
                                                                            les
                                                                            payments
                                                                            et
                                                                            tout
                                                                            les
                                                                            actions
                                                                            concernants
                                                                            cette
                                                                            employer
                                                                        </p>
                                                                    </div>
                                                                    <div className="mt-4">
                                                                        <button
                                                                            type="button"
                                                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                                                            onClick={async () => {
                                                                                await handleDelete(
                                                                                    selectedEmp
                                                                                );
                                                                                setIsOpen(
                                                                                    false
                                                                                );
                                                                                setSelectedEmp(
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
                                                                        <CheckIcon
                                                                            className="w-6 h-6 text-red-600"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </div>
                                                                    <Dialog.Title
                                                                        as="h3"
                                                                        className="text-lg font-medium leading-6 text-gray-900"
                                                                    >
                                                                        Employer
                                                                        supprimer
                                                                        avec
                                                                        succes
                                                                    </Dialog.Title>

                                                                    <div className="mt-4">
                                                                        <button
                                                                            type="button"
                                                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                                                            onClick={async () => {
                                                                                closeModal();
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
                                        </li>
                                    )
                                )
                            )}
                    </ul>
                </div>
            </main>
        </>
    );
}
