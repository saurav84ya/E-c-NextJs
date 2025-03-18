import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {

    const menulist = [

        {
            name: "Home ",
            link: "/home"
        }, {
            name: "About Us",
            link: "/about-us"
        }, {
            name: "Contact Us",
            link: "/contact-us"
        },
    ]

    return (
        <nav className='py-4 px-14 border-b flex items-center justify-between ' >
            <Image alt='logo' src="/logo.png" width={100} height={200} />
            <div className='flex gap-4 items-center font-semibold' >
                {
                    menulist?.map((item, index) => {
                        return (
                            <Link key={index} href={item?.link} >
                                <button>
                                    {item?.name}
                                </button>
                            </Link>
                        )
                    })
                }
            </div>
            <Link  href={"/login"} >
                <button className='bg-blue-600 font-bold px-4 py-3 rounded-full text-white  ' >
                    Login
                </button>
            </Link>
        </nav>
    )
}
