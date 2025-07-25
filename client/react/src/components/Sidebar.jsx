import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-30 md:static md:block">
      <div className="p-6">
        <div className="mb-4 font-semibold text-gray-600 uppercase text-xs">Merkez</div>
        <Link
          to="/dashboard"
          className="block px-3 py-2 rounded hover:bg-indigo-100 text-gray-700"
        >
          🏠 Panel
        </Link>

        <div className="mt-6 mb-2 font-semibold text-gray-600 uppercase text-xs">Arayüz</div>
        <details className="mb-2">
          <summary className="cursor-pointer px-3 py-2 rounded hover:bg-indigo-100 text-gray-700 font-medium flex justify-between">
            <span>Sayfalar</span>
            <span>▼</span>
          </summary>
          <nav className="pl-4 mt-1 flex flex-col gap-1">
            <details>
              <summary className="cursor-pointer font-semibold hover:text-indigo-600">Kimlik Doğrulama ▼</summary>
              <nav className="pl-4 mt-1 flex flex-col gap-1">
                <Link to="/login" className="hover:text-indigo-600">Giriş</Link>
                <Link to="/register" className="hover:text-indigo-600">Kayıt</Link>
              </nav>
            </details>       
          </nav>
        </details>

        <div className="mt-6 mb-2 font-semibold text-gray-600 uppercase text-xs">Eklentiler</div>
        <Link
          to="/tables"
          className="block px-3 py-2 rounded hover:bg-indigo-100 text-gray-700"
        >
          📋 Tablo
        </Link>
        <Link
          to="/settings"
          className="block px-3 py-2 rounded hover:bg-indigo-100 text-gray-700"
          onClick={() => setSidebarOpen(false)}
        >
          ⚙️ Ayarlar
        </Link>
      </div>
    </aside>
  );
}
