import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <main className='w-full flex justify-center items-center bg-gray-300 p-24 min-h-screen  ' >
    <section className='flex flex-col gap-3 ' >
        <div className='flex justify-center' >
            <Image alt='logo' src={"/logo.png"} width={120} height={200}  />
        </div>
        <div className='bg-white p-10 gap-3 rounded-xl min-w-[440px]  ' >
            <h1 className='font-bold text-xl  ' >
                Create an Account
            </h1>
            <form className='flex my-3 flex-col gap-3' >
                < >
                <input
                        placeholder='Enter Your Name'    
                        type='text'
                        name='user-name'
                        id='user-name'
                        className='px-3 py-2 rounded-xl border focus:outline-none w-full '
                    />
                    <input
                        placeholder='Enter Your Email'    
                        type='email'
                        name='user-email'
                        id='user-email'
                        className='px-3 py-2 rounded-xl border focus:outline-none w-full '
                    />
                    <input
                        placeholder='Enter Your Password'    
                        type='password'
                        name='user-password'
                        id='user-password'
                        className='px-3 py-2 rounded-xl border focus:outline-none w-full '
                    />
                    <button className=' cursor-pointer bg-blue-500 p-3 font-bold text-white rounded-xl ' >Create an Account</button>
                </>
            </form>
            <div className='flex  justify-between  border-b pb-5' >
                <Link className='text-blue-800 font-semibold '  href={'/login'}>
                  already account ? login
                </Link>
            </div>
            <button className=' mt-5 cursor-pointer bg-gray-300 p-3 w-full font-semibold text-black rounded-xl ' >
                Sign up With Google
            </button>

        </div>


    </section>
</main>
  )
}
