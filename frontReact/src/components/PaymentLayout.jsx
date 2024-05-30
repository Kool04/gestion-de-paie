import { ChevronDoubleDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Transition, Dialog } from "@headlessui/react";

export default function PaymentLayout() {
    const { num_emp } = useParams();
    let [isOpen, setIsOpen] = useState(false);
    const [userField, setUserField] = useState({
        num_emp: num_emp,
        type: "",
        montant: "",
    });

    function close() {
        setIsOpen(false);
    }

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

    return (
        <>
            <Transition appear show={isOpen}>
                <Dialog
                    as="div"
                    className="relative z-10 focus:outline-none"
                    onClose={close}
                    __demoMode
                >
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4">
                            <Transition.Child
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <Dialog.Panel className="w-full max-w-md p-6 rounded-xl bg-white/5 backdrop-blur-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-medium text-white text-base/7"
                                    >
                                        Payment successful
                                    </Dialog.Title>
                                    <p className="mt-2 text-sm/6 text-white/50">
                                        Your payment has been successfully
                                        submitted. We’ve sent you an email with
                                        all of the details of your order.
                                    </p>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
