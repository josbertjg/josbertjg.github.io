import { motion, useAnimate } from "motion/react"
import html from "@/assets/logos/html.png"
import { useBreakpoints } from "../../../shared/hooks/useBreakpoints"

const SkillIcon = ({index}: {index: number}) => {
  const [scope, animate] = useAnimate()
  const {lgUp, smUp} = useBreakpoints()
  const duration = 1
  const iconDistance = index * (lgUp ? 90 : smUp ? 80 : 55)
  const path: React.CSSProperties = {
    offsetPath: `path("M 400 800 C 100 300, 200 100, ${(iconDistance) + 200} 100")`,
  }
  const handleSpring = async () => {
    await animate(scope.current, { offsetDistance: "99.8%" }, { duration: duration/7 })
    await animate(scope.current, { offsetDistance: "100%" }, { duration: duration/7 })
  }

  return (
    <motion.div
      ref={scope}
      style={path}
      className="w-18 rounded absolute lg:bottom-30 bottom-25 lg:left-0 -left-50 motion-safe:transform"
      initial={{ offsetDistance: "0%", scale: 2.5 }}
      animate={{ offsetDistance: "100%", scale: 1 }}
      onAnimationComplete={handleSpring}
      transition={{ duration, ease: "easeInOut", delay: (index * duration) / 3 }}
    >
      <motion.img 
        src={html} 
        alt="josbert guedez skill"
        className="lg:w-24 sm:w-16 w-12" 
        animate={{ y: 3, x: 1 }}
        transition={{ duration: Math.random() * (3 - 2) + 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
    </motion.div>
  )
}

export default SkillIcon
