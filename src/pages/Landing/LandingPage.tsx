import SkillIcon from "./components/SkillIcon"
import { useRef } from 'react'
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { useBreakpoints } from "../../shared/hooks/useBreakpoints"

gsap.registerPlugin(MotionPathPlugin)

export default function LandingPage() {
  const container = useRef<HTMLDivElement>(null)

  const { customBreakpoint } = useBreakpoints()
  const up1300 = customBreakpoint({ width: 1300, type: "up" })
  const up1100 = customBreakpoint({ width: 1100, type: "up" })

  const handleViewBox = (): string => {
    if(up1300) return "600 950"
    if(up1100) return "900 800"
    return "1000 800"
  }

  useGSAP(() => {
    const icons = gsap.utils.toArray<HTMLElement>(".skillIcon")

    gsap.set(icons, {
      position: "absolute",
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      transformOrigin: "50% 50%"
    })

    icons.forEach((icon, index) => {
      const progress = 1 - (index * 0.05)
      gsap.to(icon, {
        opacity: 1,
        scale: 1,
        motionPath: {
          path: "#circlePath",
          align: "#circlePath",
          alignOrigin: [0.5, 0.5],
          start: 0,
          end: progress
        },
        duration: 4,
        ease: "power1.inOut",
        delay: index * 0.15
      })
    })
  }, { scope: container })

  return (
    <div ref={container} className='flex items-center justify-center h-full w-full relative'>
      <svg
        className="absolute w-full h-full pointer-events-none"
        viewBox={`-500 -500 ${handleViewBox()}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          id="circlePath"
          d="
            M-1083,478 C-1083,350 -790.27,514.196 -608,413 -455.3384,328.2426 -396.27,365.474 -281.992,350.915 -101.164,327.877 110.271,311.525 62.257,170.502 -10.449,-43.039 84.9307,-173.0251 230.656,-162.985 422.352,-149.777 446.261,133.197 389,178
          "
          fill="none"
          stroke="transparent"
        />

        <foreignObject x={80} y={-100} width="100%" height="100%">
          <div className="w-70 h-70 rounded-full bg-gray-300">
            {/* <img src="foto.jpg" className="w-full h-full object-cover rounded-full" /> */}
          </div>
        </foreignObject>
      </svg>

      {[...Array(9)].map((_, i) => (
        <SkillIcon key={i} />
      ))}

    </div>
  )
}
