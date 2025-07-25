import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await axios.post("http://localhost:8000/api/register", {
        username,
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Kayıt olurken bir hata oluştu");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 font-sans">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-center mb-8">Kayıt Ol</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Kullanıcı adınızı giriniz."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email adresinizi giriniz."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Şifrenizi giriniz."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full transition-colors duration-200"
          >
            Kayıt Ol
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Hesabınız var mı?{" "}
          <a href="/" className="text-indigo-600 hover:underline">
            Giriş yapınız
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default SignUp;
