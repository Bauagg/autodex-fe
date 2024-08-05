import axios from "axios";
import "./style-login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import gambar from "./logoRegister.jpeg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [messageEmailError, setMessageEmailError] = useState('')
    const [messagePasswordError, setMessagePasswordError] = useState('')
    const navigate = useNavigate();

    const hendleEmailChange = (value) => {
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regexEmail.test(value)) {
            setEmailError(true);
        } else {
            setEmailError(false);
            setEmail(value);
        }
    }

    const handlePasswordChange = (value) => {
        if (value.length < 8) {
            setPasswordError(true);
            setPassword(value);
        } else {
            setPasswordError(false);
        }
    }

    const handleLogin = () => {
        if (!email) {
            setEmailError(true)
            return setMessageEmailError('Email tidak valid')
        }

        if (!password) {
            setPasswordError(true);
            return setMessagePasswordError('Kata sandi tidak valid')
        }

        const data = { email, password }

        axios.post(`${process.env.REACT_APP_API_URL}/api/login`, data)
            .then((result) => {
                console.log(result.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="bg-white  flex flex-col sm:flex-row justify-center gap-5 p-4 max-w-screen-xl mx-auto">
            <div className="flex justify-center rounded-lg sm:w-[65%]  ">
                <div className="bg-custom w-full min-h-[500px] relative sm:max-w-[808px] sm:h-[983px]  rounded-lg flex justify-center items-center   ">
                    <div className=" text-white absolute flex flex-col justify-between w-full sm:max-w-[748px] sm:h-[905px] p-5 h-[480px] ">
                        <h1 className="capitalize text-2xl sm:text-5xl">logo</h1>
                        <div className="bg-[rgba(0,0,0,0.6)] p-5 sm:p-7  rounded-lg">
                            <h1 className=" mb-6 text-xl  sm:text-4xl">
                                Bergabunglah dengan Komunitas <br />
                                BIM Kami
                            </h1>
                            <p className="sm:text-md text-xs">
                                Daftar sekarang untuk mulai memanfaatkan kekuatan Building
                                Information Modeling. Dapatkan akses ke alat inovatif, data yang
                                terintegrasi, dan jaringan profesional yang siap mendukung
                                kesuksesan proyek konstruksi Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:w-[35%]  flex items-center justify-center flex-col">
                <div className="sm:max-w-[450px] shadow-lg p-7 ">
                    <h2 className="text-2xl font-bold mb-3">Masuk ke Akun Anda</h2>
                    <p className="mb-6">
                        Masukkan detail akun Anda untuk melanjutkan
                    </p>
                    <form className="">
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => hendleEmailChange(e.target.value)}
                                required
                                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            <p className="text-red-500">Email tidak valid</p>
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                required
                                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:bg-primary-dark bg-[#171821]"
                        >
                            Masuk
                        </button>
                        <p className="mb-6 text-center">
                            Apakah anda belum punya aku ?{" "}
                            <span className="font-bold cursor-pointer" onClick={() => navigate('/register')}>Daftar</span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
