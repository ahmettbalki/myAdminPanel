import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/employees")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ağa bağlanılamadı");
        }
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Bir hata oluştu");
        setLoading(false);
      });
  }, []);

  return (
    <div className="px-6 py-6">
      <h1 className="text-2xl font-semibold mb-2">Ana Sayfa</h1>

      {user ? (
        <div className="mb-6 p-4 bg-indigo-100 rounded text-indigo-900">
          <h2 className="font-semibold mb-1">Hoşgeldin, {user.username}!</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p className="mb-6 text-gray-500">Kullanıcı bilgisi yükleniyor...</p>
      )}

      {/* Table */}
      <div className="bg-white rounded shadow">
        <div className="border-b px-4 py-2 font-semibold">📋 Tablo</div>
        <EmployeeTable />
      </div>

      {/* Hata ve yüklenme durumu */}
      {loading && <p>Yükleniyor...</p>}
      {error && <p className="text-red-600">Hata: {error}</p>}
    </div>
  );
}
