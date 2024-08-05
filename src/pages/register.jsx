import axios from "axios";
import "./style-login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [namaError, setNamaError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [konfirmasi_password_error, set_konfirmasi_password_error] = useState(false)
  const [messageNameError, setMessageNameError] = useState('')
  const [messageEmailError, setMessageEmailError] = useState('')
  const [messagePasswordError, setMessagePasswordError] = useState('')
  const [messageKonfirmasiPasswordError, setMessageKonfirmasiPassword] = useState('')
  const navigate = useNavigate();

  const handleNameChange = (value) => {
    setNama(value)
    setMessageNameError('')
    if (!value) {
      setNamaError(true)
    } else {
      setNamaError(false)
    }
  }

  const hendleEmailChange = (value) => {
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    setEmail(value);
    setMessageEmailError('')
    if (!regexEmail.test(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }

  const handlePasswordChange = (value) => {
    setPassword(value);
    setMessagePasswordError('')
    if (value.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }

  const handleKonfirmasiPassword = (value) => {
    setKonfirmasiPassword(value)
    setMessageKonfirmasiPassword('')
    if (value !== password) {
      set_konfirmasi_password_error(true)
    } else if (value.length < 8) {
      set_konfirmasi_password_error(true)
    } else {
      set_konfirmasi_password_error(false)
    }
  }

  const hendleRegister = (e) => {
    e.preventDefault();

    if (!nama) {
      setNamaError(true);
      setMessageNameError('Nama tidak boleh kosong');
      return;
    }

    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!email || !regexEmail.test(email)) {
      setEmailError(true)
      setMessageEmailError('Email tidak valid')
      return
    }

    if (!password || password < 8) {
      setPasswordError(true);
      setMessagePasswordError('Kata sandi tidak valid')
      return
    }


    if (!konfirmasiPassword || konfirmasiPassword.length < 8 || konfirmasiPassword !== password) {
      set_konfirmasi_password_error(true);
      if (konfirmasiPassword !== password) {
        return setMessageKonfirmasiPassword("Kata sandi tidak cocok");
      }
      return setMessageKonfirmasiPassword("Kata sandi konfirmasi tidak valid");
    }

    const data = { name: nama, email, password, konfirmasi_password: konfirmasiPassword }

    axios.post(`${process.env.REACT_APP_API_URL}/api/register`, data)
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        if (err.response.data.message === 'email sudah terdaftar') {
          setEmailError(true)
          setMessageEmailError('Email sudah terdaftar')
          return
        }
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
          <h2 className="text-2xl font-bold mb-3">Bergabung Sekarang</h2>
          <p className="mb-6">
            Buat akun dan mulai jelajahi fitur-fitur kami yang menarik.
          </p>
          <form onSubmit={hendleRegister}>
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
                onChange={(e) => handleNameChange(e.target.value)}
                required
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${namaError ? 'border-red-500' : 'border-gray-300'}`}
              />
              {messageNameError && (<p className="text-red-500 text-xs">{messageNameError}</p>)}
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
                onChange={(e) => hendleEmailChange(e.target.value)}
                required
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${emailError ? 'border-red-500' : 'border-gray-300'}`}
              />
              {messageEmailError && (<p className="text-red-500 text-xs">{messageEmailError}</p>)}
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
              {messagePasswordError && (<p className="text-red-500 text-xs">{messagePasswordError}</p>)}
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
                onChange={(e) => handleKonfirmasiPassword(e.target.value)}
                required
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${konfirmasi_password_error ? 'border-red-500' : 'border-gray-300'}`}
              />
              {messageKonfirmasiPasswordError && (<p className="text-red-500 text-xs">{messageKonfirmasiPasswordError}</p>)}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:bg-primary-dark bg-[#171821]"
            >
              Daftar
            </button>
            <p className="mb-6 text-center">
              Apakah anda sudah punya aku ?{" "}
              <span className="font-bold cursor-pointer" onClick={() => navigate('/')}>Masuk</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
