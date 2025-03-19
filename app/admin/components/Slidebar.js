"use client";

import { Boxes, ChartBarStacked, Codesandbox, LayoutDashboard, LogOut, PackageSearch, ShoppingCart, Star, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

export default function Sidebar({ menu, setMenu }) {
    const menuList = [
        { name: "dashboard", icon: <LayoutDashboard /> },
        { name: "products", icon: <PackageSearch /> },
        { name: "categories", icon: <ChartBarStacked /> },
        { name: "brands", icon: <Codesandbox /> },
        { name: "orders", icon: <ShoppingCart /> },
        { name: "customers", icon: <User /> },
        { name: "reviews", icon: <Star /> },
        { name: "collections", icon: <Boxes /> }
    ];

    const pathname = usePathname();
    const sidebarRef = useRef(null);

    // Click outside to close sidebar
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setMenu(false); // Close menu when clicking outside
            }
        }

        if (menu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menu]);

    return (
        <aside 
            ref={sidebarRef}
            className={`bg-white border-r px-5 py-3 w-64 h-screen 
                ${menu ? "translate-x-0" : "-translate-x-[300px] md:translate-x-0"} 
                ease-in-out transition-all duration-500 
                absolute md:relative md:flex flex-col justify-between z-50`}
        >
            {/* Logo Section */}
            <div className="flex justify-center py-4">
                <Image alt="logo" src="/logo.png" width={100} height={50} />
            </div>

            {/* Menu List */}
            <nav className="mt-5 flex justify-center overflow-y-auto h-[70vh] md:h-full">
                <ul className="space-y-2 w-full">
                    {menuList.map((item, index) => {
                        const isSelected = pathname === `/admin/${item.name}`;

                        return (
                            <li key={index} 
                                onClick={() => setMenu(false)} 
                                className={`flex items-center gap-3 px-3 py-2 rounded-md transition 
                                    ${isSelected ? "bg-gray-200 text-black font-bold" : "text-gray-700 hover:bg-gray-100"}`}
                            >
                                <Link href={`/admin/${item.name}`} className="flex items-center w-full gap-3">
                                    {item.icon}
                                    <span className="capitalize">{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Logout Section */}
            <div className="py-6">
                <div className="p-4 cursor-pointer flex justify-center gap-3 hover:bg-gray-500 
                    font-semibold bg-gray-300 rounded-lg w-full"
                    onClick={() => console.log("Logout clicked")}
                >
                    <LogOut />
                    <h1>Logout</h1>
                </div>
            </div>
        </aside>
    );
}
