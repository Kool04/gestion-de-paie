import { DocumentArrowDownIcon, TrashIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { NavLink } from "react-router-dom";

export default function Payment() {
    const [payment, setPayment] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

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
                                                        /*onClick={() =>
                                                    handleDeleteButtonClick(
                                                        item.ref
                                                    )
                                                }*/
                                                    >
                                                        <TrashIcon
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
                    </table>
                </div>
            </main>
        </>
    );
}
