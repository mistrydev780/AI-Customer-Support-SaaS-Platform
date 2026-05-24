'use client'

import React, {
    useState,
    useEffect,
    useRef
} from 'react'

import {
    motion,
    AnimatePresence
} from "motion/react"
import axios from 'axios'
import { useRouter } from "next/navigation"

function HomeClient({
    email
}: {
    email?: string
}) {

    const [open, setOpen] = useState(false)

    const [loading, setLoading] = useState(false)

    const dropdownRef =
        useRef<HTMLDivElement>(null)

    const handleLogin = () => {
        setLoading(true)
        window.location.href =
            "/api/auth/login"
    }

  const handleLogout = () => {
    window.location.href = "/api/auth/logout"
}

    const firstLetter =
        email
            ? email.charAt(0).toUpperCase()
            : "U"

    // Close dropdown
    useEffect(() => {
        const handleClickOutside = (
            event: MouseEvent
        ) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(
                    event.target as Node
                )
            ) {
                setOpen(false)
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        )

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            )
        }
    }, [])

    const navigate=useRouter()

    return (
        <div className='min-h-screen bg-[#fafafa] text-black overflow-x-hidden'>

            {/* Background */}
            <div className='fixed inset-0 -z-10'>
                <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-zinc-200/40 blur-3xl rounded-full' />
            </div>

            {/* Navbar */}
            <motion.header
                initial={{
                    y: -30,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1
                }}
                transition={{
                    duration: 0.5
                }}
                className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'
            >

                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>

                    {/* Logo */}
                    <div className='flex items-center gap-2'>
                        <div className='w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm'>
                            AI
                        </div>

                        <h1 className='font-semibold text-lg'>
                            Support<span className='text-zinc-400'>AI</span>
                        </h1>
                    </div>

                    {/* Right */}
                    {email ? (
                        <div
                            className='relative'
                            ref={dropdownRef}
                        >

                            <button
                                onClick={() => setOpen(!open)}
                                className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition'
                            >
                                {firstLetter}
                            </button>

                            <AnimatePresence>
                                {open && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 10
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: 10
                                        }}
                                        className='absolute right-0 mt-3 w-60 bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden'
                                    >

                                        <div className='px-4 py-4 border-b border-zinc-100'>
                                            <p className='text-xs text-zinc-400'>
                                                Signed in as
                                            </p>

                                            <p className='text-sm font-medium break-all mt-1'>
                                                {email}
                                            </p>
                                        </div>

                                        <div className='p-2'>

                                            <button className='w-full text-left px-4 py-3 rounded-xl hover:bg-zinc-100 text-sm transition'
                                                onClick={() => navigate.push("/dashboard")}>
                                                Dashboard
                                            </button>

                                            <button
                                                onClick={handleLogout}
                                                className='w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-500 text-sm transition'
                                            >
                                                Logout
                                            </button>

                                        </div>

                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    ) : (
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className='px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition'

                        >
                           {loading?"Loading....":"Login"}
                        </button>
                    )}

                </div>

            </motion.header>

            {/* HERO */}
            <section className='relative pt-36 pb-24 px-6'>

                <div className='max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center'>

                    {/* Left */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 30
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 0.6
                        }}
                    >

                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 shadow-sm mb-8'>
                            <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />

                            <span className='text-sm text-zinc-600'>
                                AI Powered Customer Support
                            </span>
                        </div>

                        <h1 className='text-5xl md:text-7xl font-bold tracking-tight leading-tight'>
                            AI Customer
                            <br />
                            Support Built
                            <br />
                            for Modern
                            <br />
                            Websites
                        </h1>

                        <p className='mt-8 text-lg text-zinc-600 leading-relaxed max-w-xl'>
                            Add a powerful AI chatbot to your website in minutes.
                            Let your customers get instant answers using your own
                            business knowledge.
                        </p>

                        <div className='mt-10 flex flex-wrap gap-4'>

                            <button
                                // onClick={handleLogin}
                                className='px-8 py-4 rounded-2xl bg-black text-white font-medium hover:bg-zinc-800 transition shadow-xl'
                                onClick={() => navigate.push("/dashboard")}
                            >
                                Get Started
                            </button>

                            <button
                                className='px-8 py-4 rounded-2xl bg-white border border-zinc-200 font-medium hover:bg-zinc-50 transition'
                            >
                                Learn More
                            </button>

                        </div>

                    </motion.div>

                    {/* Right */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.95
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1
                        }}
                        transition={{
                            duration: 0.7
                        }}
                        className='relative'
                    >

                        <div className='bg-white border border-zinc-200 rounded-3xl p-6 shadow-2xl'>

                            <p className='text-sm text-zinc-500 mb-4'>
                                Live Chat Preview
                            </p>

                            <div className='space-y-4'>

                                <div className='bg-zinc-100 rounded-2xl px-4 py-3 text-sm w-fit max-w-xs'>
                                    Do you offer cash on delivery?
                                </div>

                                <div className='flex justify-end'>
                                    <div className='bg-black text-white rounded-2xl px-4 py-3 text-sm w-fit max-w-xs'>
                                        Yes, Cash on Delivery is available.
                                    </div>
                                </div>

                                <div className='bg-zinc-100 rounded-2xl px-4 py-3 text-sm w-fit max-w-xs'>
                                    What is your return policy?
                                </div>

                                <div className='flex justify-end'>
                                    <div className='bg-black text-white rounded-2xl px-4 py-3 text-sm w-fit max-w-xs'>
                                        We offer 7 days easy returns.
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Floating Chat */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 3
                            }}
                            className='absolute -bottom-5 -right-5 w-16 h-16 rounded-full bg-black shadow-2xl flex items-center justify-center'
                        >
                            <div className='w-3 h-3 bg-white rounded-full' />
                        </motion.div>

                    </motion.div>

                </div>

            </section>

            {/* FEATURES */}
            <section className='py-24 border-t border-zinc-200 bg-white'>

                <div className='max-w-7xl mx-auto px-6'>

                    <h2 className='text-4xl font-bold text-center mb-16'>
                        Why Businesses Choose SupportAI
                    </h2>

                    <div className='grid md:grid-cols-3 gap-8'>

                        {[
                            {
                                title: "Plug & Play",
                                desc: "Add the chatbot to your site with a single script tag."
                            },
                            {
                                title: "Admin Controlled",
                                desc: "You control exactly what the AI knows and answers."
                            },
                            {
                                title: "Always Online",
                                desc: "Your customers get instant support 24/7."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{
                                    y: -5
                                }}
                                className='bg-[#fafafa] border border-zinc-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition'
                            >

                                <div className='w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mb-6 font-bold'>
                                    {index + 1}
                                </div>

                                <h3 className='text-2xl font-semibold mb-4'>
                                    {item.title}
                                </h3>

                                <p className='text-zinc-600 leading-relaxed'>
                                    {item.desc}
                                </p>

                            </motion.div>
                        ))}

                    </div>

                </div>

            </section>

            {/* FOOTER */}
            <footer className='py-10 border-t border-zinc-200 bg-white'>

                <div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4'>

                    <p className='text-zinc-500 text-sm'>
                        © 2026 SupportAI. All rights reserved.
                    </p>

                    <div className='flex items-center gap-6 text-sm text-zinc-500'>
                        <button className='hover:text-black transition'>
                            Privacy
                        </button>

                        <button className='hover:text-black transition'>
                            Terms
                        </button>

                        <button className='hover:text-black transition'>
                            Contact
                        </button>
                    </div>

                </div>

            </footer>

        </div>
    )
}

export default HomeClient