import { Fragment, useEffect, useState } from "react";
import {
    AtSymbolIcon,
    BriefcaseIcon,
    CheckIcon,
    ChevronDownIcon,
    CreditCardIcon,
    CurrencyDollarIcon,
    ExclamationTriangleIcon,
    HomeIcon,
    IdentificationIcon,
    KeyIcon,
    MapPinIcon,
    PencilIcon,
    PencilSquareIcon,
    PhoneArrowDownLeftIcon,
    XMarkIcon,
} from "@heroicons/react/20/solid";
//import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Info() {
    const { num_emp } = useParams();
    const [user, setUser] = useState([]);
    const [action, setAction] = useState([]);
    const [userField, setUserField] = useState({
        num_emp: num_emp,
        type: "",
        salaire_fin: user.salaire_fin || "",
    });
    const [validationErrors, setValidationErrors] = useState({});

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);

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

    function closeModal3() {
        setIsOpen3(false);
    }

    function openModal3() {
        setIsOpen3(true);
    }

    useEffect(() => {
        fetchUser();
    }, [num_emp]);

    useEffect(() => {
        document.title = "Information- Gestion de payement"; // Mettez ici le titre que vous souhaitez
    }, []);

    const fetchUser = async () => {
        try {
            const result = await axios.get(
                "http://127.0.0.1:8000/api/liste/" + num_emp
            );
            console.log(result.data.liste);
            console.log(
                "Contenu de photo_path :",
                result.data.liste.photo_path
            );
            setUser(result.data.liste);
        } catch (err) {
            console.log("erreur", err);
        }

        try {
            const result = await axios.get(
                "http://127.0.0.1:8000/api/listeAction/" + num_emp
            );
            console.log(result.data.actions);

            setAction(result.data.actions);
        } catch (err) {
            console.log("erreur", err);
        }
    };

    const handleDelete = async (ref) => {
        try {
            console.log(ref);
            await axios.delete(
                "http://127.0.0.1:8000/api/supprimerAction/" + ref
            );
            // Après la suppression réussie, recharge les données de l'utilisateur
            fetchUser();
        } catch (error) {
            console.log("Erreur lors de la suppression de l'action :", error);
        }
    };

    const handleDeleteButtonClick = (numero_marche) => {
        setSelectedAction(numero_marche);
        openModal();
    };
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

            closeModal2();
            navigate("/defaultLayout/payment/");
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
            <div className="flex justify-between bg-gray-100">
                <div className="mt-5">
                    <button type="button mt-5">
                        <NavLink
                            to="/defaultLayout/liste"
                            // className="flex items-center"
                        >
                            <ArrowLeftIcon className="w-8 h-8 ml-8 " />
                        </NavLink>
                    </button>
                </div>
                <div className="max-w-screen-xl px-4 py-2 mx-auto mt-3 bg-white shadow-xl sm:px-6 lg:px-8 rounded-2xl ">
                    <div className="mt-4 lg:flex lg:items-center lg:justify-between">
                        <div className="flex items-center">
                            <img
                                className="inline-block w-20 h-20 rounded-full ring-2 ring-white"
                                src={`http://localhost:8000/storage/${user.photo_path}`}
                                alt=""
                            />
                            <div className="ml-3 ">
                                <div className="flex-1 min-w-0 ">
                                    <p className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight ">
                                        {user && user.nom + " " + user.prenom}
                                    </p>
                                </div>

                                <div className="flex items-center mt-1">
                                    <div className="flex items-center mr-6 text-sm text-gray-500">
                                        <BriefcaseIcon
                                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        {user && user.poste}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <MapPinIcon
                                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-600"
                                            aria-hidden="true"
                                        />
                                        {user && user.lieu}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-5 lg:ml-4 lg:mt-0">
                            <span className="hidden sm:block">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    <NavLink
                                        to={`/defaultLayout/info/action/${user.num_emp}`}
                                        className="flex items-center"
                                    >
                                        <PlusIcon
                                            className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        Ajouter Action
                                    </NavLink>
                                </button>
                            </span>

                            <span className="sm:ml-3">
                                <button
                                    type="button"
                                    onClick={openModal2}
                                    className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <CheckIcon
                                        className="-ml-0.5 mr-1.5 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    Payer
                                </button>
                            </span>

                            {/* Dropdown */}
                            <Menu as="div" className="relative ml-3 sm:hidden">
                                <Menu.Button className="inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                                    More
                                    <ChevronDownIcon
                                        className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 -mr-1 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-100"
                                                            : "",
                                                        "block px-4 py-2 text-sm text-gray-700"
                                                    )}
                                                >
                                                    Edit
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-100"
                                                            : "",
                                                        "block px-4 py-2 text-sm text-gray-700"
                                                    )}
                                                >
                                                    View
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                    <div className="max-w-5xl px-4 py-2 mx-auto lg:flex lg:items-center lg:justify-between lg:px-8">
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold leading-7 text-center text-gray-900">
                                    Employe Information:
                                </h3>
                                <span className="hidden sm:block">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        <NavLink
                                            to={`/defaultLayout/info/modifier/${user.num_emp}`}
                                            className="flex items-center"
                                        >
                                            <PencilIcon
                                                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            Modifier
                                        </NavLink>
                                    </button>
                                </span>
                            </div>
                            <div className="mt-2 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="flex items-center px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                                            <KeyIcon
                                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            Numero employe
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {user && user.num_emp}
                                        </dd>
                                    </div>
                                    <div className="flex items-center px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                                            <IdentificationIcon
                                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            CIN
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {user && user.cin}
                                        </dd>
                                    </div>
                                    <div className="flex items-center px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                                            <CreditCardIcon
                                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            numero Carte Bancaire
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {user && user.num_carte}{" "}
                                        </dd>
                                    </div>

                                    <div className="flex items-center px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                                            <PhoneArrowDownLeftIcon
                                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            numero telephone
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {user && user.num_tel}
                                        </dd>
                                    </div>
                                    <div className="flex items-center px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                                            <HomeIcon
                                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            Adresse actuel
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {user && user.adresse}
                                        </dd>
                                    </div>
                                    <div className="flex items-center px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                                            <AtSymbolIcon
                                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            Adresse mail
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {user && user.email}
                                        </dd>
                                    </div>
                                    <div className="flex items-center px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                                            <CurrencyDollarIcon
                                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            Salaire de Base
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {user && user.salaire_base} AR
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="h-10 mt-2 ">
                        <p className="font-bold text-center text-5sm">
                            <u>Salaire finale:{user.salaire_fin} Ar</u>
                        </p>
                    </div>

                    <h3 className="mt-2 text-center">
                        <u>
                            Tableau historique de l&apos;employer de ce mois :
                        </u>
                    </h3>
                    <table className="w-full mt-4 mb-10 border-collapse">
                        <thead>
                            <tr className="text-sm font-medium leading-6 text-gray-900 border-b border-gray-300">
                                <th className="w-5">action</th>
                                <th className="w-25">Motif</th>
                                <th className="w-5">Montant</th>
                                <th className="w-15">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {action &&
                                action.map((item) => (
                                    <tr
                                        key={item.ref}
                                        className="text-sm text-gray-700 border-b border-gray-300"
                                    >
                                        <td
                                            className={`w-10 py-2 text-center pl-4 pr-4 font-bold ${
                                                item.action === "Sanction"
                                                    ? "text-red-600"
                                                    : item.action === "Prime"
                                                    ? "text-green-500"
                                                    : item.action === "Avance"
                                                    ? "text-orange-500"
                                                    : ""
                                            }`}
                                        >
                                            {item.action}
                                        </td>
                                        <td className="py-2 pl-4 pr-4 text-center w-25">
                                            {item.motif}
                                        </td>
                                        <td className="w-5 py-2 pl-4 pr-4 text-center">
                                            {item.montant}
                                        </td>
                                        <td className="py-2 pl-4 pr-4 text-center w-15">
                                            {item.date}
                                        </td>
                                        <td className="w-20 py-2">
                                            <div className="flex mt-5 lg:ml-4 lg:mt-0">
                                                <p className="text-sm leading-6 text-gray-900">
                                                    <button type="button">
                                                        <NavLink
                                                            to={`/defaultLayout/info/modifierAction/${item.num_emp}/${item.ref}`}
                                                        >
                                                            <PencilSquareIcon
                                                                className="text-green-500 w-7 h-7 "
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
                                                                item.ref
                                                            )
                                                        }
                                                    >
                                                        <XMarkIcon
                                                            className="text-red-600 w-7 h-7 "
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
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
                                                    <ExclamationTriangleIcon
                                                        className="w-6 h-6 text-red-600"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Êtes-vous sûr de vouloir
                                                    annuler cette action ?
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Si vous supprimer cette
                                                        action ca modifiera le
                                                        salaire de
                                                        l&apos;employer a la fin
                                                        du mois
                                                    </p>
                                                </div>
                                                <div className="mt-4">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                                        onClick={async () => {
                                                            await handleDelete(
                                                                selectedAction
                                                            );
                                                            setIsOpen(false);
                                                            setSelectedAction(
                                                                null
                                                            );
                                                            closeModal();
                                                            openModal3();
                                                        }}
                                                    >
                                                        Confirmer la suppression
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

                        <Transition appear show={isOpen3} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-10"
                                onClose={closeModal3}
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
                                        onClick={closeModal3}
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
                                                    Action supprimer avec succes
                                                </Dialog.Title>

                                                <div className="mt-4">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                                        onClick={async () => {
                                                            closeModal3();
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
                    </table>
                    <Transition appear show={isOpen2} as={Fragment}>
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
                                            <div className="flex items-center justify-center">
                                                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                                    <CurrencyDollarIcon
                                                        className="w-6 h-6 text-green-600"
                                                        aria-hidden="true"
                                                    />
                                                </div>

                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    Payment
                                                </Dialog.Title>
                                            </div>
                                            <p>
                                                veuillez bien verifier le
                                                montant et le type de payment
                                            </p>
                                            <div className="mt-2">
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
                                                            onChange={(e) =>
                                                                changeUserFieldHandler(
                                                                    e
                                                                )
                                                            }
                                                            value={num_emp}
                                                            autoComplete="given-name"
                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    {validationErrors.num_emp && (
                                                        <p className="mt-1 text-xs text-red-500">
                                                            {
                                                                validationErrors
                                                                    .montant[0]
                                                            }
                                                        </p>
                                                    )}
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
                                                        onChange={(e) =>
                                                            changeUserFieldHandler(
                                                                e
                                                            )
                                                        }
                                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        <option> </option>
                                                        <option>
                                                            Virement bancaire
                                                        </option>
                                                        <option>espece</option>
                                                    </select>
                                                    <ChevronDownIcon
                                                        className="absolute top-0 w-5 h-full text-gray-400 pointer-events-none right-3"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                {validationErrors.type && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {
                                                            validationErrors
                                                                .montant[0]
                                                        }
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
                                                            onChange={(e) =>
                                                                changeUserFieldHandler(
                                                                    e
                                                                )
                                                            }
                                                            value={
                                                                user.salaire_fin
                                                            }
                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    {validationErrors.montant && (
                                                        <p className="mt-1 text-xs text-red-500">
                                                            {
                                                                validationErrors
                                                                    .montant[0]
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        onSubmitChange(e);
                                                    }}
                                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                                >
                                                    Payer
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center px-4 py-2 mx-4 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                    onClick={() => {
                                                        closeModal2();
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
            </div>
        </>
    );
}
