import React from "react";
import EmployeeTable from "../components/EmployeeTable";

export default function Tables() {
  return (
    <div className="px-6 py-6">
      <h1 className="text-2xl font-semibold mb-4">Çalışan Tablosu</h1>
      <div className="bg-white rounded shadow">
        <div className="border-b px-4 py-2 font-semibold">📋 Tüm Çalışanlar</div>
        <EmployeeTable />
      </div>
    </div>
  );
}
