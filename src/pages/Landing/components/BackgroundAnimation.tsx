import { useRef } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export const BackgroundAnimation = ({ onBlackOutFinished }: { onBlackOutFinished: () => void }) => {

  const bg = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(bg.current, {
      keyframes: [
        { height: "30vh", width: "0vw" },
        { height: "30vh", width: "20vw" },
        { height: "30vh", width: "20vw" },
        { height: "100vh", width: "20vw" },
        { height: "100vh", width: "20vw" },
        { height: "100vh", width: "20vw" },
        { height: "100vh", width: "20vw" },
        { height: "100vh", width: "100vw" },
      ],
      duration: 3,
      ease: "power3.out",
      delay: 1,
    })
    if (bg.current)
      tl.to(bg.current.children, {
        opacity: 1,
        onComplete: onBlackOutFinished
      })
  })

  return (
    <div ref={bg} className="absolute bg-secondary w-0 h-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className='h-96 xl:w-3xl lg:w-xl md:w-lg sm:w-md w-sm -top-32 -left-20 absolute top-gradient'></div>
      <div className='h-96 xl:w-7xl lg:w-5xl md:w-3xl sm:w-xl w-md xl:-bottom-44 -bottom-52 -right-32 absolute bottom-gradient'></div>
    </div>
  )
}
