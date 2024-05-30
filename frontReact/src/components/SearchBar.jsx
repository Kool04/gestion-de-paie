import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import PropTypes from "prop-types";

export default function SearchBar({ placeholder, data, updateFilteredData }) {
    //const [setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    //console.log(data);

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            // Vérifiez les différentes propriétés pour le filtrage
            return (
                (value.nature &&
                    value.nature
                        .toLowerCase()
                        .includes(searchWord.toLowerCase())) ||
                (value.nom &&
                    value.nom
                        .toLowerCase()
                        .includes(searchWord.toLowerCase())) ||
                (value.num_emp &&
                    value.num_emp.toString().includes(searchWord.toLowerCase()))
                // Ajoutez autant de conditions que nécessaire pour les autres propriétés
            );
        });

        updateFilteredData(newFilter);
    };

    return (
        <>
            {/* Barre de recherche*/}
            <div>
                <div className="relative mt-2 mb-2 rounded-md shadow-sm">
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={wordEntered}
                        onChange={handleFilter}
                        className="block w-full rounded-3xl border-0 py-1.5 w-55 h-8 pr-20 text-gray-900 ring-1 ring-inset bg-white-100 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="currency" className="sr-only">
                            Currency
                        </label>
                        <MagnifyingGlassIcon
                            className="w-5 h-5 m-5 text-gray-500"
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
SearchBar.propTypes = {
    placeholder: PropTypes.string,
    data: PropTypes.array,
    updateFilteredData: PropTypes.func,
};
