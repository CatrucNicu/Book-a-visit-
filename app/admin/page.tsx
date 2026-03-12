// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import BookingCalendar from "@/components/BookingCalendar";

export default function AdminDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      if (selected.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(selected));
      } else {
        setPreview(null);
      }
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("Selectează un fișier mai întâi!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setUploadMessage(`Încărcat cu succes: ${data.fileName}`);
        setUploadedFiles(prev => [...prev, data.fileName]);
        setFile(null);
        setPreview(null);
      } else {
        setUploadMessage(`Eroare: ${data.error || "necunoscută"}`);
      }
    } catch (err) {
      setUploadMessage("Eroare la conectare cu serverul");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Titlu principal */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Gestionare rezervări și conținut site
          </p>
        </div>

        {/* Secțiunea Rezervări */}
        <div className="mb-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="px-8 py-6 bg-indigo-600 text-white">
            <h2 className="text-2xl font-semibold">Gestionare Rezervări</h2>
          </div>
          <div className="p-8">
            <BookingCalendar />
          </div>
        </div>

        {/* Secțiunea Upload */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="px-8 py-6 bg-green-600 text-white">
            <h2 className="text-2xl font-semibold">Încărcare Fișiere pe Site</h2>
          </div>
          <div className="p-8 space-y-8">
            {/* Input + buton */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Alege fișier (imagine, PDF, document etc.)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                           file:mr-4 file:py-3 file:px-6
                           file:rounded-lg file:border-0
                           file:text-sm file:font-semibold
                           file:bg-indigo-50 file:text-indigo-700
                           hover:file:bg-indigo-100
                           cursor-pointer"
              />
            </div>

            {/* Preview */}
            {preview && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Previzualizare:</p>
                <div className="border border-gray-300 rounded-lg overflow-hidden max-w-md">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-auto max-h-64 object-contain"
                  />
                </div>
              </div>
            )}

            {/* Buton Încarcă */}
            <button
              onClick={handleUpload}
              disabled={!file}
              className={`px-8 py-4 rounded-xl font-medium text-white text-lg transition-all shadow-md ${
                file
                  ? "bg-green-600 hover:bg-green-700 active:bg-green-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Încarcă acum
            </button>

            {/* Mesaj status */}
            {uploadMessage && (
              <div className={`mt-4 p-4 rounded-lg text-center font-medium ${
                uploadMessage.includes("succes") 
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}>
                {uploadMessage}
              </div>
            )}

            {/* Lista fișierelor recente */}
            {uploadedFiles.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Fișiere încărcate recent:
                </h3>
                <ul className="space-y-3">
                  {uploadedFiles.map((name, index) => (
                    <li key={index}>
                      <a
                        href={`/uploads/${name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 hover:underline transition"
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}