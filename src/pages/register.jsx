import './style-login.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
    const navigate = useNavigate()
    return (
        <div className="flex py-5 px-5">
            <div className="border-2 rounded-lg contenImagesLogin">
                <h1>Baus</h1>
            </div>
            <div className="bg-white h-max flex justify-center containerFormUtama">
                <div className="contenForm mx-8 my-8 gapsPading">
                    <h2 className="text-2xl font-bold mb-3">Bergabung Sekarang</h2>
                    <p className='mb-6'>Buat akun dan mulai jelajahi fitur-fitur kami yang menarik.</p>
                    <form >
                        <div className="mb-4">
                            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="text"
                                id="nama"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                required
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="konfirmasi_password" className="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi</label>
                            <input
                                type="password"
                                id="konfirmasi_password"
                                value={konfirmasiPassword}
                                onChange={(e) => setKonfirmasiPassword(e.target.value)}
                                required
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:bg-primary-dark bg-[#171821]"
                        >
                            Daftar
                        </button>
                        <p className='mb-6 text-center'>Apakah anda sudah punya aku ? <span>Masuk</span></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register