import { ArrowLeftIcon, PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { CheckIcon, PlusIcon } from "@heroicons/react/20/solid";

export default function Example() {
    const [userField, setUserField] = useState({
        num_emp: "",
        nom: "",
        prenom: "",
        cin: "",
        poste: "",
        lieu: "",
        num_tel: "",
        num_carte: "",
        adresse: "",
        email: "",
        salaire_base: "",
        salaire_fin: "",
        photo_path: null,
    });
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal2() {
        setIsOpen2(false);
        navigate("/defaultLayout/liste");
    }

    function openModal2() {
        setIsOpen2(true);
    }

    useEffect(() => {
        document.title = "Ajouter employer- Gestion de payement"; // Mettez ici le titre que vous souhaitez
    }, []);

    const navigate = useNavigate();

    const changeUserFieldHandler = (e) => {
        let value;
        if (e.target.type === "file") {
            value = e.target.files[0]; // Pour les fichiers, la valeur est le premier fichier sélectionné
        } else {
            value = e.target.value; // Pour les autres champs, la valeur est la valeur de l'élément de formulaire
        }
        setUserField({
            ...userField,
            [e.target.name]:
                e.target.type === "file" ? e.target.files[0] : e.target.value,
        });
    };

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            Object.keys(userField).forEach((key) => {
                formData.append(key, userField[key]);
            });

            const response = await axios.post(
                "http://127.0.0.1:8000/api/ajouter",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

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
        <>
            <div className="flex justify-between">
                <div className="mt-5">
                    <button type="button">
                        <NavLink
                            to="/defaultLayout/liste"
                            className="flex items-center"
                        >
                            <ArrowLeftIcon className="w-8 h-8 ml-8 " />
                        </NavLink>
                    </button>
                </div>
                <div className="max-w-5xl px-4 py-5 mx-auto bg-white shadow-2xl lg:px-8 rounded-2xl">
                    <form encType="multipart/form-data">
                        <div className="max-w-4xl px-20 py-2 mx-auto space-y-2 sm:px-10 lg:px-10">
                            <h1 className="text-center">
                                <strong>
                                    <u>Ajout de nouveau Employer:</u>
                                </strong>
                            </h1>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Information Personel
                            </h2>

                            <ul className="text-sm leading-6 text-gray-600 ">
                                <dl className="divide-y divide-gray-100">
                                    <li className="px-5">
                                        Veuiller bien verifier les informations
                                    </li>
                                    <li className="px-5">
                                        Utilisez une adresse mail et numero de
                                        telephone valable
                                    </li>
                                    <li className="px-5">
                                        Utilisez une photo recente
                                    </li>
                                </dl>
                            </ul>

                            <div className="pb-12 border-b border-gray-900/10">
                                <label
                                    htmlFor="postal-code"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    numero employe
                                </label>

                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="num_emp"
                                        id="num_emp"
                                        onChange={(e) =>
                                            changeUserFieldHandler(e)
                                        }
                                        style={{
                                            borderColor:
                                                validationErrors.num_emp
                                                    ? "red"
                                                    : "", // Condition pour changer la couleur de la bordure en rouge
                                        }}
                                        className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {validationErrors.num_emp && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {validationErrors.num_emp[0]}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="last-name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Nom
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="nom"
                                                id="nom"
                                                onChange={(e) =>
                                                    changeUserFieldHandler(e)
                                                }
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {validationErrors.nom && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {validationErrors.nom[0]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="last-name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Prenom
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="prenom"
                                                id="prenom"
                                                onChange={(e) =>
                                                    changeUserFieldHandler(e)
                                                }
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {validationErrors.prenom && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {validationErrors.prenom[0]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            CIN
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="cin"
                                                id="cin"
                                                onChange={(e) =>
                                                    changeUserFieldHandler(e)
                                                }
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {validationErrors.cin && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {validationErrors.cin[0]}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="region"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Poste
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="poste"
                                                id="poste"
                                                onChange={(e) =>
                                                    changeUserFieldHandler(e)
                                                }
                                                autoComplete="address-level1"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {validationErrors.poste && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {validationErrors.poste[0]}
                                            </p>
                                        )}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="postal-code"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Lieu
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="lieu"
                                                id="lieu"
                                                onChange={(e) =>
                                                    changeUserFieldHandler(e)
                                                }
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {validationErrors.lieu && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {validationErrors.lieu[0]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Numero carte
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="num_carte"
                                                id="num_carte"
                                                onChange={(e) =>
                                                    changeUserFieldHandler(e)
                                                }
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {validationErrors.num_carte && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {validationErrors.num_carte[0]}
                                            </p>
                                        )}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="region"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Numero Telephone
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="num_tel"
                                                id="num_tel"
                                                onChange={(e) =>
                                                    changeUserFieldHandler(e)
                                                }
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {validationErrors.num_tel && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {validationErrors.num_tel[0]}
                                            </p>
                                        )}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="postal-code"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Adresse
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="adresse"
                                                id="adresse"
                                                onChange={(e) =>
                                                    changeUserFieldHandler(e)
                                                }
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {validationErrors.adresse && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {validationErrors.adresse[0]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Adresse mail
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                onChange={(e) =>
                                                    changeUserFieldHandler(e)
                                                }
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {validationErrors.email && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {validationErrors.email[0]}
                                            </p>
                                        )}
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Salaire de base(Ariary)
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="salaire_base"
                                                id="salaire_base"
                                                onChange={(e) =>
                                                    changeUserFieldHandler(e)
                                                }
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {validationErrors.salaire_base && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {
                                                    validationErrors
                                                        .salaire_base[0]
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-full">
                                        <label
                                            htmlFor="cover-photo"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Photo
                                        </label>
                                        <label
                                            htmlFor="photo_path"
                                            className="relative font-semibold text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Télécharger une photo</span>
                                            <input
                                                id="photo_path"
                                                name="photo_path"
                                                onChange={(e) =>
                                                    changeUserFieldHandler(e)
                                                }
                                                type="file"
                                                className="sr-only"
                                            />
                                        </label>
                                        <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
                                            {userField.photo_path && (
                                                <img
                                                    src={URL.createObjectURL(
                                                        userField.photo_path
                                                    )}
                                                    width="200px"
                                                    alt="Preview"
                                                />
                                            )}
                                            {!userField.photo_path && (
                                                <div className="text-center">
                                                    <PhotoIcon
                                                        className="w-12 h-12 mx-auto text-gray-300"
                                                        aria-hidden="true"
                                                    />
                                                    <div className="flex mt-4 text-sm leading-6 text-gray-600">
                                                        <p className="pl-1">
                                                            Ajouter une photo
                                                        </p>
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-600">
                                                        PNG, JPG,
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
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
                        </div>
                    </form>
                </div>
                <Transition appear show={isOpen} as={Fragment}>
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
                                            <PlusIcon
                                                className="w-6 h-6 text-green-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Ajouter Nouveau Employer
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Êtes-vous sûr de vouloir Ajouter
                                                cette employer?
                                            </p>
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                                onClick={(e) => {
                                                    onSubmitChange(e);
                                                    closeModal();
                                                    openModal2();
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

                <Transition appear show={isOpen2} as={Fragment}>
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
                                onClick={closeModal2}
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
                                            Employer Ajouter avec succes
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
        </>
    );
}
