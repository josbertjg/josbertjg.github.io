import { useEffect, useRef, useState } from 'react'
import gsap from "gsap"
import { SplitText } from 'gsap/all'
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { BackgroundAnimation } from "./components/BackgroundAnimation"
import IconsAnimation from "./components/IconsAnimation"

gsap.registerPlugin(MotionPathPlugin)

export default function LandingPage() {
  const container = useRef<HTMLDivElement>(null)
  const textContainer = useRef<HTMLDivElement>(null)
  const [isBlackOutComplete, setIsBlackOutComplete] = useState<boolean>(false)

  useEffect(() => {
    let ctx = null
    ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1 })
      if (isBlackOutComplete && textContainer.current) {
        textContainer.current.style.display = "flex"
        const splitName = SplitText.create(textContainer.current.getElementsByClassName("name")[0], { type: "chars, words" })
        // const splitDescription = SplitText.create(textContainer.current.getElementsByClassName("description")[0], { type: "chars, words" })

        tl.from(textContainer.current.getElementsByClassName("greet")[0], { y: 20, autoAlpha: 0, duration: 1, ease: "power1.inOut", delay: 0.5 })
          .from(splitName.chars, { y: 20, autoAlpha: 0, stagger: 0.05 }, 1)
          .from(textContainer.current.getElementsByClassName("seniority")[0], { y: 20, autoAlpha: 0, ease: "power1.inOut" }, 2)
          .from(textContainer.current.getElementsByClassName("description")[0], { y: 20, autoAlpha: 0, ease: "power1.inOut" }, 2.3)
          // .from(splitDescription.chars, { y: 100, autoAlpha: 0, stagger: { amount: 1, from: "random" } }, 2.5)
          .to(textContainer.current.getElementsByClassName("btn")[0], { scale: 1, ease: "power1.inOut" }, 3.2)
      }
    })

    return () => ctx.revert()
  }, [isBlackOutComplete])

  return (
    <div ref={container} className='h-full w-full relative'>
      <BackgroundAnimation onBlackOutFinished={() => { setIsBlackOutComplete(true) }} />

      <div className="absolute top-0 left-0z-50 h-full w-full grid grid-cols-2">
        <div ref={textContainer} className="flex-col justify-center lg:col-span-1 col-span-2 xl:ps-20 xl:pb-32 lg:ps-10 md:ps-5 md:pb-72 sm:pb-22 pb-32 px-5 hidden">
          <h2 className="md:text-2xl sm:text-xl text:lg font-bold text-primary greet">¡Hey There! I'm</h2>
          <h1 className="text-white xl:text-7xl lg:text-6xl sm:text-5xl text-4xl font-bold tracking-wide name">Josbert Guedez</h1>
          <h3 className="text-tertiary font-semibold mt-2 text-base seniority">Software Developer & UX/UI +3 years of professional experience</h3>
          <p className="mt-2 text-tertiary font-semibold text-sm sm:block hidden description">Especializado en el desarrollo de interfaces modernas, accesibles y eficientes. Alta adaptabilidad a proyectos, metodologías ágiles, y entornos colaborativos. ¿te interesa conocer un poco más sobre mi trabajo?</p>
          <button
            className="text-white hover:text-secondary bg-primary hover:bg-tertiary rounded-full sm:px-4 px-2 py-4 mt-7 cursor-pointer z-10 sm:w-60 w-45 font-semibold sm:text-base text-sm transition-all duration-300 scale-0 btn"
            onClick={() => {
              gsap.to(container.current!.getElementsByTagName("button")[0], {
                scale: 30,
                duration: 3,
                ease: "power1.out",
              })
            }}>Descubre mi trabajo</button>
        </div>
      </div>

      <IconsAnimation isBlackOutComplete={isBlackOutComplete} />

    </div>
  )
}
