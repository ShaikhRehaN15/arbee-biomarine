'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";

const BACKEND_URL = 'http://localhost:5001'; // Define backend URL

export default function Financials() {
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserAndReports = async () => {
    setLoading(true);
    try {
      // Fetch user info if token exists
      const token = localStorage.getItem("accessToken");
      if (token) {
        const userRes = await fetch(`${BACKEND_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        if (userRes.ok) {
          setUser(userData.user);
        } else {
          setUser(null);
          localStorage.removeItem("accessToken");
        }
      }

      // Fetch reports
      const reportsRes = await fetch(`${BACKEND_URL}/api/reports`);
      const reportsData = await reportsRes.json();
      if (reportsRes.ok) setReports(reportsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchUserAndReports();
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", file.name.replace(/\.[^/.]+$/, ""));

    try {
      const res = await fetch(`${BACKEND_URL}/api/reports`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        const newReport = await res.json();
        setReports((prev) => [newReport, ...prev]);
      } else {
        const errorData = await res.json();
        alert(`Upload failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (report) => {
    setReportToDelete(report);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!reportToDelete) return;

    setLoading(true);
    setShowDeleteConfirm(false);
    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch(`${BACKEND_URL}/api/reports/${reportToDelete._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setReports((prev) => prev.filter((r) => r._id !== reportToDelete._id));
      } else {
        const errorData = await res.json();
        alert(`Delete failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("Error deleting report.");
    } finally {
      setLoading(false);
      setReportToDelete(null);
    }
  };

  const isAdmin = user?.role === "admin";

  return (
    <section className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#1D1D1D] to-[#292929] pt-[2vh] overflow-visible">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl z-50">Loading...</div>
      )}

      <div className="flex-1 flex flex-col w-full px-[clamp(24px,calc(24px+(96*(100vw-320px)/704)),120px)] py-[clamp(4vh,6vh,8vh)]">
        {/* Top Text Section */}
        <div className="flex flex-col gap-[clamp(2vh,3vh,4vh)]">
          <h1 className="font-bold font-noto-sans text-[clamp(28px,calc(28px+(28*(100vw-320px)/704)),46px)] text-white">
            Financials and Annual Reports
          </h1>
          <div className="flex flex-col gap-[clamp(1.5vh,2vh,2.5vh)]">
            <h2 className="text-[clamp(20px,calc(20px+(20*(100vw-320px)/704)),22px)] font-noto-sans font-semibold text-white">
              Purpose That Drives Every Step
            </h2>
            <h3 className="text-[clamp(14px,calc(14px+(14*(100vw-320px)/704)),18px)] font-noto-sans font-normal mb-[clamp(3vh,4vh,5vh)] text-gray-300">
              Just like Arbee’s product excellence, Arbee Care is built on unwavering commitment to quality and impact:
            </h3>
          </div>
        </div>

        {/* Latest Financial Reports */}
        <div className="flex flex-col bg-[#2C2C2C] mt-8 rounded-lg">
          {/* Header */}
          <div className="px-[12px]">
            <div className="pt-[8px] px-[12px] pb-[8px] border-b border-[#444] flex flex-row items-center justify-between">
              <span className="font-noto-sans font-normal text-[clamp(12px,2vw,16px)] text-white">Latest Financial Reports</span>
              <div className="flex items-end h-[40px]">
                {isAdmin && (
                  <label className="flex items-center gap-2 px-4 py-2 border border-[#b3b3b3] rounded bg-[#232323] text-white cursor-pointer text-[15px] font-noto-sans font-normal hover:bg-[#333] transition">
                    <Image src="/Vector(3).svg" alt="upload" width={18} height={18} />
                    Add financial report
                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="p-[12px] w-full">
            <div
              className="grid gap-y-[12px] gap-x-[16px] w-full"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, clamp(120px, calc(120px + (30 * (100vw - 320px) / 140)), 160px))',
                columnGap: "clamp(4px, calc(4px + (12 * (100vw - 320px) / 30)), 16px)",
              }}
            >
              {reports.length === 0 && !loading && <p className="text-gray-400">No reports available.</p>}
              {reports.map((report) => (
                <div key={report._id} className="flex flex-row gap-[6px] h-[44px] px-[8px] py-[8px] items-center bg-[#2C2C2C] text-white rounded">
                  <a href={`${BACKEND_URL}${report.filePath}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-[clamp(10px,2vw,14px)] overflow-hidden whitespace-nowrap text-ellipsis hover:underline">
                    {report.title}
                  </a>
                  <Image src="/Vector(3).svg" alt="download button" width={14} height={14} className="flex-shrink-0" />
                  {isAdmin && (
                    <button onClick={() => handleDeleteClick(report)} className="ml-2 text-red-500 hover:text-red-700 pointer-events-auto flex-shrink-0">❌</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && reportToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[90vw] max-w-md text-center">
            <h2 className="text-xl font-bold mb-4 text-black">Confirm Deletion</h2>
            <p className="mb-6 text-gray-700">Do you want to delete the report: <span className="font-semibold">{reportToDelete.title}</span>?</p>
            <div className="flex justify-center gap-4">
              <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700" onClick={handleConfirmDelete}>Delete</button>
              <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}











 
