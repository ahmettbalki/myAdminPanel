import React, { useState, useEffect } from "react";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Mevcut kullanıcı bilgilerini getir
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8000/api/current-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Kullanıcı bilgisi alınamadı");
        return res.json();
      })
      .then((data) => {
        setEmail(data.email || "");
        setUsername(data.username || "");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Form submit işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Önce giriş yapmalısınız.");
      return;
    }

    fetch("http://localhost:8000/api/user-settings", {
      method: "PUT", // veya backend'de ne kullandıysan
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, username }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Güncelleme başarısız");
        return res.json();
      })
      .then((data) => {
        setMessage("Ayarlar başarıyla güncellendi!");
      })
      .catch(() => {
        setMessage("Bir hata oluştu.");
      });
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Kullanıcı Ayarları</h2>
      {message && (
        <div className="mb-4 p-2 bg-indigo-100 text-indigo-700 rounded">{message}</div>
      )}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Kullanıcı Adı:
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          Email:
          <input
            type="email"
            className="w-full mt-1 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Güncelle
        </button>
      </form>
    </div>
  );
}
