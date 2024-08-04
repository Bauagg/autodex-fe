import "./style-login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import gambar from "./logoRegister.jpeg";

const Register = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-white  flex flex-col sm:flex-row justify-center gap-5 p-4 max-w-screen-xl mx-auto">
      <div className="flex justify-center rounded-lg sm:w-[65%]  ">
        <div className="bg-custom w-full min-h-[500px] relative sm:max-w-[808px] sm:h-[983px]  rounded-lg flex justify-center items-center   ">
          <div className=" text-white absolute flex flex-col justify-between w-full sm:max-w-[748px] sm:h-[905px] p-5 h-[480px] ">
            <h1 className="capitalize text-2xl sm:text-5xl">logo</h1>
            <div className="bg-[rgba(0,0,0,0.6)] p-5  rounded-lg">
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
          <h2 className="text-2xl font-bold mb-3">Bergabung Sekarang</h2>
          <p className="mb-6">
            Buat akun dan mulai jelajahi fitur-fitur kami yang menarik.
          </p>
          <form className="">
            <div className="mb-4">
              <label
                htmlFor="nama"
                className="block text-sm font-medium text-gray-700"
              >
                Nama
              </label>
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
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
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
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="konfirmasi_password"
                className="block text-sm font-medium text-gray-700"
              >
                Konfirmasi Kata Sandi
              </label>
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
            <p className="mb-6 text-center">
              Apakah anda sudah punya aku ? <span>Masuk</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
