import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import QRCode from "qrcode.react";

export default function Pdf() {
    const { num_emp, num_payment } = useParams();
    const [user, setUser] = useState([]);
    const [action, setAction] = useState([]);
    const [payment, setPayment] = useState([]);

    const qrData = JSON.stringify({
        user: user,
    });

    useEffect(() => {
        document.title = "Fiche de paie- Gestion de payement";
        fetchUser();
    }, [num_emp, num_payment]);

    const fetchUser = async () => {
        try {
            const userResult = await axios.get(
                "http://127.0.0.1:8000/api/liste/" + num_emp
            );
            console.log(
                "Contenu de photo_path :",
                userResult.data.liste.photo_path
            );
            setUser(userResult.data.liste);

            const actionResult = await axios.get(
                "http://127.0.0.1:8000/api/listeAction/" + num_emp
            );
            setAction(actionResult.data.actions);

            const paymentResult = await axios.get(
                "http://127.0.0.1:8000/api/listePayment/" + num_payment
            );
            setPayment(paymentResult.data.liste);
        } catch (err) {
            console.log("erreur", err);
        }
    };

    const handlePrint = () => {
        const element = document.getElementById("pdf-content");
        const opt = {
            margin: 5, // Spécifiez la taille des marges en millimètres
            filename: "fiche de paie.pdf",
            image: { type: "jpeg", quality: 0.99 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        html2pdf().from(element).set(opt).save();
    };
    return (
        <>
            <div className="mt-5">
                <button type="button mt-5">
                    <NavLink to="/defaultLayout/payment">
                        <ArrowLeftIcon className="w-8 h-8 ml-8 " />
                    </NavLink>
                </button>
            </div>
            <div
                id="pdf-content"
                className="flex-col w-[794px] h-[1123px] mx-auto my-10 bg-white pb-9 px-14ring-1 ring-gray-400/10 "
            >
                <div className="max-w-screen-xl px-4 mx-auto bg-white shadow-xl sm:px-6 lg:px-8 rounded-2xl ">
                    <h3 className="mt-2 text-center">
                        <u>Fiche de paye:</u>
                    </h3>
                    <div className="flex items-center justify-between">
                        <div className="qr-code-container">
                            <QRCode value={qrData} size={128} />
                        </div>
                        <div className="flex items-center">
                            <div className="flex ml-15 ">
                                <img
                                    className="w-40 h-40 "
                                    src="/test2.webp"
                                    alt="logo1"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="max-w-5xl px-4 py-2 mx-auto lg:flex lg:items-center lg:justify-between lg:px-8">
                        <div className="w-full">
                            <div className="mt-2 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="flex items-center px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                                            Numero employe
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {user && user.num_emp}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-5xl px-4 py-2 mx-auto mt-2 lg:flex lg:items-center lg:justify-between lg:px-8">
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold leading-7 text-center text-gray-900">
                                    <u>Payment information:</u>
                                </h3>
                            </div>
                            <div className="mt-2 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="flex items-center px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                                            Numero Payment
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {payment && payment.num_payment}
                                        </dd>
                                    </div>
                                    <div className="flex items-center px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                                            Type de payment
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {payment && payment.type}
                                        </dd>
                                    </div>
                                    <div className="flex items-center px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                                            Date de payment
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {payment && payment.date}
                                        </dd>
                                    </div>
                                    <div className="flex items-center px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                                            salaire de base
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {user && user.salaire_base}
                                        </dd>
                                    </div>

                                    <div className="flex items-center px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                                            Salaire final
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <strong>
                                                {payment && payment.montant} AR
                                            </strong>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <h3 className="mt-3 ml-8">
                        <u>Tableau historique de vos action cette mois :</u>
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
                                        <td className="w-10 py-2 pl-4 pr-4 font-bold text-center">
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
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-end mt-6 gap-x-6">
                    <button
                        type="button"
                        onClick={handlePrint}
                        className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Imprimer
                    </button>
                </div>
            </div>
        </>
    );
}
