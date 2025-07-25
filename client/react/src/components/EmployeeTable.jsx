import React, { useEffect, useState } from "react";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/employees")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ağ yanıt vermiyor");
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
    <div className="overflow-x-auto p-4">
      {loading && <p>Veri Yükleniyor...</p>}
      {error && <p className="text-red-600">Hata: {error}</p>}
      {!loading && !error && (
        <table className="min-w-full table-fixed border-collapse border text-sm">
  <thead>
    <tr className="bg-gray-100">
      <th className="w-1/6 px-4 py-2 text-left">Ad</th>
      <th className="w-1/6 px-4 py-2 text-left">Pozisyon</th>
      <th className="w-1/6 px-4 py-2 text-left">Ofis</th>
      <th className="w-1/12 px-4 py-2 text-left">Yaş</th>
      <th className="w-1/6 px-4 py-2 text-left">Başlama Tarihi</th>
      <th className="w-1/6 px-4 py-2 text-left">Maaş</th>
    </tr>
  </thead>
  <tbody>
    {employees.map((emp, idx) => (
      <tr key={idx} className="border-t">
        <td className="px-4 py-2">{emp.name || emp.Name || emp.fullName || "-"}</td>
        <td className="px-4 py-2">{emp.position || emp.Position || "-"}</td>
        <td className="px-4 py-2">{emp.office || emp.Office || "-"}</td>
        <td className="px-4 py-2">{emp.age || emp.Age || "-"}</td>
        <td className="px-4 py-2">
          {emp.startDate ? new Date(emp.startDate).toLocaleDateString("tr-TR") : "-"}
        </td>
        <td className="px-4 py-2">{emp.salary || emp.Salary || "-"}</td>
      </tr>
    ))}
  </tbody>
</table>
      )}
    </div>
  );
}
