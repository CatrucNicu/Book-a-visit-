// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import BookingCalendar from "@/components/BookingCalendar";

export default function AdminDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Opțional: listează fișierele existente din /public/uploads (prin API dacă ai)
  useEffect(() => {
    // Dacă vrei să listezi fișierele deja încărcate, poți adăuga un GET /api/upload/list
    // pentru moment le punem manual sau le lași goale
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      if (selected.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(selected));
      } else {
        setPreview(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("Te rog selectează un fișier!");
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
        setUploadMessage(`Fișier încărcat cu succes: ${data.fileName}`);
        setUploadedFiles((prev) => [...prev, data.fileName]);
        setFile(null);
        setPreview(null);
      } else {
        setUploadMessage(`Eroare: ${data.error || "necunoscută"}`);
      }
    } catch (err) {
      setUploadMessage("Eroare la conectarea la server");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {/* Secțiunea cu calendar */}
      <div className="mb-12 bg-white p-6 rounded-xl shadow border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Gestionare Rezervări</h2>
        <BookingCalendar />
      </div>

      {/* Secțiunea cu upload fișiere */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Încărcare Conținut pe Site</h2>

        <div className="space-y-6">
          {/* Input fișier + preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selectează fișier (imagine, PDF, etc.)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          {/* Preview imagine (dacă e imagine) */}
          {preview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 object-contain rounded border border-gray-300"
              />
            </div>
          )}

          {/* Buton upload */}
          <button
            onClick={handleUpload}
            disabled={!file}
            className={`px-6 py-3 rounded-lg font-medium text-white transition ${
              file
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Încarcă fișierul
          </button>

          {/* Mesaj status */}
          {uploadMessage && (
            <p
              className={`mt-4 text-sm font-medium ${
                uploadMessage.includes("succes") ? "text-green-600" : "text-red-600"
              }`}
            >
              {uploadMessage}
            </p>
          )}

          {/* Listă fișiere încărcate (simplă, momentan statică) */}
          {uploadedFiles.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Fișiere încărcate recent:</h3>
              <ul className="list-disc pl-6 space-y-1">
                {uploadedFiles.map((name, i) => (
                  <li key={i} className="text-sm text-gray-600">
                    <a
                      href={`/uploads/${name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
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

      {/* Poți adăuga aici alte secțiuni admin */}
    </div>
  );
}