import { BackgroundEffect } from "./components/Background"
import logo from "@/assets/logos/react.png"
import { motion } from "motion/react"

export default function LandingPage() {
  return (
      <div className='flex items-center justify-center h-full w-full relative'>
    <BackgroundEffect />
    <motion.div></motion.div>
    <img className="w-56" src={logo}alt="" />
        </div>
  )
}