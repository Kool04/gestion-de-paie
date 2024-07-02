import {
    ArrowTrendingUpIcon,
    CheckIcon,
    CurrencyDollarIcon,
    UsersIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";

export default function Accueil() {
    const { currentUser, userToken } = useStateContext();
    const [totalEmployers, setTotalEmployers] = useState(0);
    const [payment, setPayment] = useState(0);
    const [greeting, setGreeting] = useState("");

    const [action, setAction] = useState(0);

    useEffect(() => {
        document.title = "Accueil- Gestion de payement";
        fetchData();
        setGreeting(getGreeting());
    }, []);
    if (!userToken) {
        return <Navigate to="/loginclient" />;
    }

    const fetchData = async () => {
        try {
            const result = await axios.get("http://127.0.0.1:8000/api/liste");

            if (result.data.results) {
                setTotalEmployers(result.data.results.length);
            }

            const actionResult = await axios.get(
                "http://127.0.0.1:8000/api/listeAction/"
            );
            setAction(actionResult.data.results.length);

            const paymentResult = await axios.get(
                "http://127.0.0.1:8000/api/listePayment/"
            );
            setPayment(paymentResult.data.results.length);
        } catch (err) {
            console.log("erreur", err);
        }
    };

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        return currentHour >= 0 && currentHour < 12 ? "Bonjour" : "Bonsoir";
    };

    return (
        <div className="overflow-hidden bg-white py-15 sm:py-20">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <div className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">
                                Site de gestion de Paie du société
                            </h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                {greeting} {currentUser.name}
                            </p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Ce site web regroupe le payment qui se déroule
                                dans notre société, Veuillez bien vérifier et
                                bien examiner les formulaires que vous
                                remplissez pour ne pas vous tromper.
                                L&apos;argent qui est ici est tout en Ariary. Si
                                vous avez un problème veuillez contacter le
                                technicien le plus rapidement.
                            </p>

                            <div className="container px-4 py-4 mx-auto bg-white border-gray-300 shadow-xl w-22 rounded-2xl">
                                <div className="flex items-center">
                                    <div>
                                        <CurrencyDollarIcon className="w-10 h-10" />
                                    </div>
                                    <h2 className="ml-2 text-lg font-bold">
                                        Total Argent du mois:
                                    </h2>
                                </div>

                                <div className="mx-20 mt-2 text-xl font-bold text-green-500">
                                    {/* Afficher le nombre total d'employés */}
                                    50.000.000 Ar
                                </div>
                            </div>

                            <div className="container px-4 py-4 mx-auto mt-6 bg-white border-gray-300 shadow-xl w-22 rounded-2xl">
                                <div className="flex items-center">
                                    <div>
                                        <UsersIcon className="w-10 h-10" />
                                    </div>
                                    <h2 className="ml-2 text-lg font-bold">
                                        Total employer:
                                    </h2>
                                </div>

                                <div className="mx-20 mt-2 text-xl font-bold text-green-500">
                                    {/* Afficher le nombre total d'employés */}
                                    {totalEmployers}
                                </div>
                            </div>

                            <div className="container px-4 py-4 mx-auto mt-6 bg-white border-gray-300 shadow-xl w-22 rounded-2xl">
                                <div className="flex items-center">
                                    <div>
                                        <ArrowTrendingUpIcon className="w-10 h-10" />
                                    </div>
                                    <h2 className="ml-2 text-lg font-bold">
                                        Nombre d&apos;Action de ce mois:
                                    </h2>
                                </div>

                                <div className="mx-20 mt-2 text-xl font-bold text-green-500">
                                    {action}
                                </div>
                            </div>
                            <div className="container px-4 py-4 mx-auto mt-6 bg-white border-gray-300 shadow-xl w-22 rounded-2xl">
                                <div className="flex items-center">
                                    <div>
                                        <CheckIcon className="w-10 h-10" />
                                    </div>
                                    <h2 className="ml-2 text-lg font-bold">
                                        Nombre de paiement:
                                    </h2>
                                </div>

                                <div className="mx-20 mt-2 text-xl font-bold text-green-500">
                                    {payment}
                                </div>
                            </div>
                        </div>
                    </div>
                    <img
                        src="sary4.png"
                        alt="Product screenshot"
                        className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                        width={2432}
                        height={1442}
                    />
                </div>
            </div>
        </div>
    );
}
