import { AnimatePresence, motion, useAnimate } from 'motion/react'
import { useState } from 'react'

export const BackgroundEffect = () => {
  const [topGrad, animTopGrad] = useAnimate()
  const [bottomGrad, animBottomGrad] = useAnimate()
  const [whiteOut, _] = useState(false)

  return (
    <motion.div className='background absolute -z-10'
      animate={{
        height: ["30vh", "30vh", "100vh", "100vh", "100vh"],
        width: ["0vw", "20vw", "20vw", "20vw", "100vw"],
      }}
      transition={{
        duration: 1.5, delay: 1, type: "keyframes", ease: (t) => {
          return t * t * t * t * t * t * t * t * t; // ease mas agresivo
        }
      }}
      onAnimationComplete={() => {
        setTimeout(() => {
          animTopGrad([
            [topGrad.current, { opacity: 1 }],
          ], { duration: 1 })

          animBottomGrad([
            [bottomGrad.current, { opacity: 1 }],
          ], { duration: 1 })
        },500)
      }}
    >
      <motion.div className='h-96 xl:w-3xl lg:w-xl md:w-lg sm:w-md w-sm -top-32 -left-20 absolute top-gradient' ref={topGrad}/>
      <motion.div className='h-96 xl:w-7xl lg:w-5xl md:w-3xl sm:w-xl w-md xl:-bottom-44 -bottom-52 -right-32 absolute bottom-gradient' ref={bottomGrad} />
      <AnimatePresence>
        {
          whiteOut &&
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 20 }}
            transition={{ duration: 1 }}
            className='absolute h-40 w-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white'
          />
        }
      </AnimatePresence>
    </motion.div>
  )
}
