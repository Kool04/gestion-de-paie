import { useState, Fragment, useEffect } from "react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function AjoutPayment() {
    const { num_emp } = useParams();
    const [user, setUser] = useState([]);
    const [userField, setUserField] = useState({
        num_emp: num_emp,
        type: "",
        montant: "",
    });

    useEffect(() => {
        document.title = "Ajouter payment-Gestion de payement"; // Mettez ici le titre que vous souhaitez
    }, []);

    useEffect(() => {
        fetchUser();
    }, [num_emp]);

    const [isOpen, setIsOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const result = await axios.get(
                "http://127.0.0.1:8000/api/liste/" + num_emp
            );
            console.log(result.data.liste);

            setUser(result.data.liste);
        } catch (err) {
            console.log("erreur", err);
        }
    };

    const changeUserFieldHandler = (e) => {
        let value;
        if (e.target.type === "file") {
            value = e.target.files[0]; // Pour les fichiers, la valeur est le premier fichier sélectionné
        } else {
            value = e.target.value; // Pour les autres champs, la valeur est la valeur de l'élément de formulaire
        }
        setUserField({
            ...userField,
            [e.target.name]: value.toString(), // Convertir la valeur en chaîne de caractères
        });
    };

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/ajouterPayment",
                userField
            );

            navigate(`/defaultLayout/info/${num_emp}`);

            console.log(response);
        } catch (err) {
            if (
                err.response &&
                err.response.data &&
                err.response.status === 422
            ) {
                const errors = err.response.data.errors;
                console.log(errors);
                // Mettre à jour l'état pour afficher les erreurs de validation
                setValidationErrors(errors);
            } else {
                console.log("erreur d'ajout", err);
            }
        }
    };

    return (
        <div className="px-6 py-8 bg-white isolate sm:py-5 lg:px-8">
            <div className="mt-5">
                <button type="button">
                    <NavLink
                        to={`/defaultLayout/info/${num_emp}`}
                        className="flex items-center"
                    >
                        <ArrowLeftIcon className="w-8 h-8 ml-8 " />
                    </NavLink>
                </button>
            </div>
            <div
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                aria-hidden="true"
            >
                <div
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Faire une payment
                </h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Le numero de l&apos;employer et le montant se font
                    automatiquement en fonction du salaire finale de
                    l&apos;employer mais vous devez bien verifier le type de
                    payment choisi par l&apos;employer
                </p>
            </div>
            <form
                action="#"
                method="POST"
                className="max-w-xl mx-auto mt-5 sm:mt-5"
            >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="first-name"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            Numero employer
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="num_emp"
                                id="num_emp"
                                value={num_emp}
                                onChange={(e) => changeUserFieldHandler(e)}
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label
                            htmlFor="company"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            Type de payment
                        </label>
                        <select
                            id="type"
                            name="type"
                            onChange={(e) => changeUserFieldHandler(e)}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            <option> </option>
                            <option>Virement bancaire</option>
                            <option>espece</option>
                        </select>
                        <ChevronDownIcon
                            className="absolute top-0 w-5 h-full text-gray-400 pointer-events-none right-3"
                            aria-hidden="true"
                        />
                    </div>
                    {validationErrors.type && (
                        <p className="mt-1 text-xs text-red-500">
                            {validationErrors.action[0]}
                        </p>
                    )}

                    <div className="sm:col-span-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            Montant
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="Text"
                                name="montant"
                                id="montant"
                                value={user.salaire_fin}
                                onChange={(e) => changeUserFieldHandler(e)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {validationErrors.montant && (
                            <p className="mt-1 text-xs text-red-500">
                                {validationErrors.montant[0]}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-end mt-6 gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Annuler
                    </button>
                    <button
                        type="button"
                        onClick={openModal}
                        className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Ajouter
                    </button>
                </div>
            </form>
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
                                        <CheckIcon
                                            className="w-6 h-6 text-green-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Voulez vous ajouter cette action?
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Si vous ajouter cette action ca
                                            modifiera le salaire de
                                            l&apos;employer a la fin du mois
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                            onClick={(e) => {
                                                onSubmitChange(e);
                                                closeModal();
                                            }}
                                        >
                                            Ajouter
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
        </div>
    );
}
