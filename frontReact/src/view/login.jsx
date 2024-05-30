import { useStateContext } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

export default function Login() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        document.title = "Login- Gestion de payement"; // Mettez ici le titre que vous souhaitez
    }, []);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setErrors({ email: "", password: "" });

        axiosClient
            .post("/login", {
                email,
                password,
            })
            .then(({ data }) => {
                setCurrentUser(data.user);
                setUserToken(data.token);
                console.log(data.token);

                navigate("/defaultLayout");
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setErrors(error.response.data);
                } else {
                    console.error(error);
                }
            });
    };

    return (
        <>
            <div className="bg-white">
                <div className="py-10 mx-auto mt-5 bg-white shadow-2xl sm:mx-20 rounded-2xl">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="w-40 h-40 mx-auto"
                            src="/test2.webp"
                            alt="logo1"
                        />
                        <h2 className="mt-0 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
                            Entrer votre adresse mail et votre mot passe
                        </h2>
                    </div>

                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    E-mail
                                </label>
                                <div className="relative mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(ev) =>
                                            setEmail(ev.target.value)
                                        }
                                        className={`block w-full rounded-md border-2 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                            errors.email ? "border-red-500" : ""
                                        }`}
                                    />
                                    {errors.email && (
                                        <p className="absolute left-0 right-0 mx-auto text-xs text-red-500 -bottom-6">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Mot de passe
                                    </label>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                <div className="relative mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(ev) =>
                                            setPassword(ev.target.value)
                                        }
                                        className={`block w-full rounded-md border-2 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                            errors.password
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    {errors.password && (
                                        <p className="absolute left-0 right-0 mx-auto text-xs text-red-500 -bottom-6">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className=" mt-4 mb-20 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Entrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
