import { useEffect } from 'react'
import { useAnimation } from 'framer-motion'

const useTodoAnimations = (isComplete?: boolean) => {
  const controls = useAnimation()
  const textControls = useAnimation()

  const eraseOutAnimation = {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 1 },
  }

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0.7},
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  useEffect(() => {
    controls.start({
      opacity: isComplete ? 0.7 : 1,
      scale: isComplete ? 0.95 : 1,
      transition: { duration: 0.5 },
    })
  }, [isComplete, controls])

  useEffect(() => {
    textControls.start({
      opacity: isComplete ? 0.7 : 1,
      scale: isComplete ? 0.95 : 1,
      transition: { duration: 0.5 },
    })
  }, [isComplete, textControls])

  return { controls, textControls, eraseOutAnimation, container, item }
}

export default useTodoAnimations
