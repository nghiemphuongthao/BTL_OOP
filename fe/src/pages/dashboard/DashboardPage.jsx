import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFileAlt, FaServicestack, FaBox, FaBuilding } from 'react-icons/fa';  // Import icons


const DashboardPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`bg-gray-800 text-white w-64 p-6 space-y-4
              transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
              md:translate-x-0 md:static fixed md:relative top-0 left-0
              h-screen z-40 transition-transform duration-300`}
            >
                <h2 className="text-2xl font-bold mb-6">
                    <image src="/src/assets/react.svg" />
                </h2>
                <ul className="space-y-4">
                    {/* Home */}
                    <li className="flex items-center">
                        <FaHome className="mr-2" />
                        <Link to="/" className="block hover:text-blue-300">Trang chủ</Link>
                    </li>

                    {/* Giấy phép */}
                    <li className="flex items-center">
                        <FaFileAlt className="mr-2" />
                        <Link to="/dashboard" className="block hover:text-blue-300">Giấy phép</Link>
                    </li>

                    {/* Dịch vụ */}
                    <li className="flex items-center">
                        <FaServicestack className="mr-2" />
                        <Link to="/dashboard" className="block hover:text-blue-300">Dịch vụ</Link>
                    </li>

                    {/* Gói dịch vụ */}
                    <li className="flex items-center">
                        <FaBox className="mr-2" />
                        <Link to="/profile" className="block hover:text-blue-300">Gói dịch vụ</Link>
                    </li>

                    {/* Doanh nghiệp */}
                    <li className="flex items-center">
                        <FaBuilding className="mr-2" />
                        <Link to="/profile" className="block hover:text-blue-300">Doanh nghiệp</Link>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-6 ml-0 md:ml-64">
                {/* Mobile toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden mb-4 p-2 bg-blue-600 text-white rounded"
                >
                    {menuOpen ? 'Close Menu' : 'Open Menu'}
                </button>

                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded shadow">Widget A</div>
                    <div className="bg-white p-6 rounded shadow">Widget B</div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
