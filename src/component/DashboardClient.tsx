'use client'

import React, {
  useEffect,
  useState
} from 'react'

import axios from "axios"

import {
  motion
} from "motion/react"
import { navigate } from 'next/dist/client/components/segment-cache/navigation'

function DashboardClient({
  ownerId
}: {
  ownerId: string
}) {

  const [businessName, setBusinessName] =
    useState("")

  const [supportEmail, setSupportEmail] =
    useState("")

  const [knowledge, setKnowledge] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [fetching, setFetching] =
    useState(true)

  const [saved, setSaved] =
    useState(false)

  // =========================================
  // FETCH SETTINGS
  // =========================================

  useEffect(() => {

    const fetchSettings = async () => {

      try {

        const result =
          await axios.post(
            "/api/settings/get",
            {
              ownerId
            }
          )

        const data = result.data

        console.log("FETCHED:", data)

        if (data) {

          setBusinessName(
            data.businessName || ""
          )

          setSupportEmail(
            data.supportEmail || ""
          )

          setKnowledge(
            data.knowledge || ""
          )

        }

      } catch (error) {

        console.log(error)

      } finally {

        setFetching(false)

      }

    }

    fetchSettings()

  }, [ownerId])

  // =========================================
  // SAVE SETTINGS
  // =========================================


useEffect(() => {

    if(ownerId){

        const handleGetDetails = async () => {

            try{

                const result = await axios.post(
                    "/api/settings/get",
                    { ownerId }
                )

                setBusinessName(
                    result.data.businessName
                )

                setSupportEmail(
                    result.data.supportEmail
                )

                setKnowledge(
                    result.data.knowledge
                )

            }

            catch(error){

                console.log(error)

            }

        }

        handleGetDetails()

    }

},[ownerId])

  

  const handleSettings = async () => {

    setLoading(true)

    try {

      const result =
        await axios.post(
          "/api/settings",
          {
            ownerId,
            businessName,
            supportEmail,
            knowledge
          }
        )

      console.log(result.data)
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
      }, 3000)
      alert("Settings Saved")

    } catch (error) {

      console.log(error)

      alert("Something went wrong")

    } finally {

      setLoading(false)

    }

  }

  // =========================================
  // NAVIGATION
  // =========================================

  const handleLogout = () => {
    window.location.href =
      "/api/auth/logout"
  }

  const handleHome = () => {
    window.location.href = "/"
  }

  const handleEmbed = () => {
    window.location.href = "/embed"
  }

  // =========================================
  // LOADING SCREEN
  // =========================================

  if (fetching) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#f7f7f7]'>
        <div className='w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#f7f7f7] text-black'>

      {/* NAVBAR */}
      <div className='fixed top-0 left-0 w-full z-50 bg-white border-b border-zinc-200'>

        <div className='max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between'>

          {/* Logo */}
          <div className='flex items-center gap-2'>

            <div className='w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-xs font-bold'>
              AI
            </div>

            <h1 className='text-xl font-semibold tracking-tight'>
              Support
              <span className='text-zinc-400'>
                AI
              </span>
            </h1>

          </div>

          {/* Buttons */}
          <div className='flex items-center gap-3'>

            <button
              onClick={handleEmbed}
              className='px-4 h-10 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 transition text-sm font-medium'
            >
              Embed Chatbot
            </button>

            <button
              onClick={handleHome}
              className='px-4 h-10 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 transition text-sm font-medium'
            >
              Home
            </button>

            <button
              onClick={handleLogout}
              className='px-4 h-10 rounded-xl bg-black text-white hover:bg-zinc-800 transition text-sm font-medium'
            >
              Logout
            </button>

          </div>

        </div>

      </div>

      {/* MAIN */}
      <div className='pt-28 pb-20 px-6'>

        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.4
          }}
          className='max-w-4xl mx-auto'
        >

          {/* CARD */}
          <div className='bg-white border border-zinc-200 rounded-[28px] shadow-sm p-10'>

            {/* Header */}
            <div className='mb-10'>

              <h1 className='text-[42px] leading-tight font-bold tracking-tight'>
                ChatBot Settings
              </h1>

              <p className='text-zinc-500 mt-3 text-lg'>
                Manage your AI chatbot knowledge and business details
              </p>

            </div>

            {/* Business Details */}
            <div className='mb-10'>

              <h2 className='text-[30px] font-bold mb-5'>
                Business Details
              </h2>

              <div className='space-y-4'>

                <input
                  type='text'
                  placeholder='Business Name'
                  value={businessName}
                  onChange={(e) =>
                    setBusinessName(
                      e.target.value
                    )
                  }
                  className='w-full h-14 px-5 rounded-2xl border border-zinc-200 outline-none bg-white text-[15px]
                                    focus:border-black/20 focus:ring-4 focus:ring-black/5 transition-all'
                />

                <input
                  type='email'
                  placeholder='Support Email'
                  value={supportEmail}
                  onChange={(e) =>
                    setSupportEmail(
                      e.target.value
                    )
                  }
                  className='w-full h-14 px-5 rounded-2xl border border-zinc-200 outline-none bg-white text-[15px]
                                    focus:border-black/20 focus:ring-4 focus:ring-black/5 transition-all'
                />

              </div>

            </div>

            {/* Knowledge Base */}
            <div className='mb-10'>

              <h2 className='text-[30px] font-bold mb-2'>
                Knowledge Base
              </h2>

              <p className='text-zinc-500 text-base mb-5'>
                Add FAQs, policies, delivery info, refunds, etc.
              </p>

              <textarea
                value={knowledge}
                onChange={(e) =>
                  setKnowledge(
                    e.target.value
                  )
                }
                placeholder='Write chatbot knowledge here...'
                className='w-full min-h-[240px] p-6 rounded-3xl border border-zinc-200 outline-none resize-none bg-white text-[15px] leading-8
                                focus:border-black/20 focus:ring-4 focus:ring-black/5 transition-all'
              />

            </div>

            {/* SAVE BUTTON */}
            <button
              onClick={handleSettings}
              disabled={loading}
              className='px-7 h-12 rounded-2xl bg-black text-white font-medium hover:bg-zinc-800 transition shadow-md disabled:opacity-50'
            >

              {loading
                ? "Saving..."
                : "Save Changes"}

              {
                saved &&
                <motion.span
                  initial={{
                    opacity: 0,
                    y: -10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  className='ml-4 text-green-500 font-medium text-sm'
                >

                  Settings Saved!
                </motion.span>
              }



            </button>

          </div>

        </motion.div>

      </div>

    </div>
  )
}

export default DashboardClient