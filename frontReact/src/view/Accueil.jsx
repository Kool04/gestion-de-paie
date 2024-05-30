import { CurrencyDollarIcon, UsersIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";

export default function Accueil() {
    useEffect(() => {
        document.title = "Accueil- Gestion de payement"; // Mettez ici le titre que vous souhaitez
    }, []);

    return (
        <div className="overflow-hidden bg-white py-15 sm:py-20">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <div className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">
                                Site de gestion de Paie du societe
                            </h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Bonjour
                            </p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Ce site web regroupe le payment qui se deroule
                                dans notre societe,Veuillez bien verifiez et
                                bien examiner les formulaires que vous
                                remplissez pour ne pas se tromper L&apos;argent
                                qui sont ici sont tous en Ariary. Si vous avez
                                un probleme veuillez contacter le technicien le
                                plus rapide
                            </p>

                            <div className="container px-4 py-4 mx-auto bg-white border-gray-300 shadow-xl w-22 rounded-2xl">
                                <div className="flex items-center">
                                    <div>
                                        <CurrencyDollarIcon className="w-10 h-10" />
                                    </div>
                                    <h2 className="ml-2 text-lg font-bold">
                                        Total Argent:
                                    </h2>
                                </div>

                                <div className="mx-20 mt-2 text-xl font-bold text-green-500">
                                    $53k
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
                                    $53k
                                </div>
                            </div>

                            {/*<dl className="max-w-xl mt-10 space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div
                                        key={feature.name}
                                        className="relative pl-9"
                                    >
                                        <dt className="inline font-semibold text-gray-900">
                                            <feature.icon
                                                className="absolute w-5 h-5 text-indigo-600 left-1 top-1"
                                                aria-hidden="true"
                                            />
                                            {feature.name}
                                        </dt>{" "}
                                        <dd className="inline">
                                            {feature.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>*/}
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
