import { useRef } from 'react'
import { useBreakpoints } from '../../../shared/hooks/useBreakpoints'
import gsap from "gsap"
import { skills } from '../../../config/data/skills'
import { useGSAP } from '@gsap/react'
import LazyImg from '../../../shared/components/LazyImg'

function IconsAnimation({ isBlackOutComplete }: { isBlackOutComplete: boolean }) {
  const imgContainer = useRef<HTMLDivElement>(null)
  const { customBreakpoint } = useBreakpoints()

  const up1300 = customBreakpoint({ width: 1300, type: "up" })
  const up1100 = customBreakpoint({ width: 1100, type: "up" })
  const down768 = customBreakpoint({ width: 768, type: "down" })
  const path = "M-1083,478 C-1083,350 -790.27,514.196 -608,413 -455.3384,328.2426 -396.27,365.474 -281.992,350.915 -101.164,327.877 110.271,311.525 62.257,170.502 -10.449,-43.039 84.9307,-173.0251 230.656,-162.985 422.352,-149.777 446.261,133.197 389,178"

  useGSAP(() => {
    if (isBlackOutComplete) {
      gsap.set(imgContainer.current, { autoAlpha: 1, x: 5 })
      gsap.from(imgContainer.current, {
        autoAlpha: 0,
        y: 100,
        duration: 2,
        ease: "power1.out"
      })

      const icons = gsap.utils.toArray<HTMLElement>(".skillIcon")
      icons.forEach((icon, index) => {
        const progress = 1 - (index * 0.05)
        const animation: gsap.TweenVars = {
          opacity: 1,
          scale: 1,
          motionPath: {
            path: "#circlePath",
            align: "#circlePath",
            alignOrigin: [0.5, 0.5],
            start: 0,
            end: progress,
          },
          duration: 4,
          ease: "power1.inOut",
          delay: index * 0.15,
        }

        gsap.to(icon, animation)
      })
    }
  }, [isBlackOutComplete])

  const responsiveViewBox = (): string => {
    if (up1300) return "600 950"
    if (up1100) return "900 800"
    if (down768) return "1000 400"
    return "1000 800"
  }

  return (
    <>
      <svg
        className="!absolute top-0 left-0 !w-full !h-full pointer-events-none"
        viewBox={`-500 -500 ${responsiveViewBox()}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          id="circlePath"
          d={path}
          fill="none"
          stroke="transparent"
          className="top-0 right-0 fixed"
        />
        <foreignObject x={80} y={-100} width="100%" height="100%" className='overflow-visible'>
          <div ref={imgContainer} className="w-70 h-70 rounded-full overflow-hidden mask-b-from-80% bg-transparent opacity-0">
            <LazyImg 
              src="assets/images/landing-photo.webp"
              smallImg="assets/images/small/landing-photo.webp"
              alt="josbert guedez"
              className='w-full h-full'
            />
          </div>
          {skills.map((skill, i) => (
            <LazyImg 
              key={i}
              src={skill.img3D}
              smallImg={skill.smallImg}
              alt="josbert guedez skill"
              className="lg:w-20 md:w-18 sm:w-14 w-8 opacity-0 transform scale-50 skillIcon absolute rounded-lg"
            />
          ))}
        </foreignObject>
      </svg>
    </>
  )
}

export default IconsAnimation
