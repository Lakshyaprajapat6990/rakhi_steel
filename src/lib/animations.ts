import { Variants } from 'framer-motion'

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
}

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 20
    } 
  }
}

export const bounceIn: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: 'spring',
      stiffness: 400,
      damping: 15
    } 
  }
}

// Stagger children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
}

// Slide animations
export const slideInFromLeft: Variants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 20
    } 
  }
}

export const slideInFromRight: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 20
    } 
  }
}

export const slideInFromTop: Variants = {
  hidden: { y: '-100%', opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 20
    } 
  }
}

export const slideInFromBottom: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 20
    } 
  }
}

// Rotate animations
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180 },
  visible: { 
    opacity: 1, 
    rotate: 0, 
    transition: { 
      type: 'spring',
      stiffness: 200,
      damping: 20
    } 
  }
}

// Flip animations
export const flipIn: Variants = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: { 
    opacity: 1, 
    rotateY: 0, 
    transition: { 
      duration: 0.6,
      ease: 'easeOut'
    } 
  }
}

// Counter animation helper
export const counterAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
}

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 400, damping: 17 }
}

export const hoverLift = {
  whileHover: { y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' },
  transition: { type: 'spring', stiffness: 300, damping: 20 }
}

// Card animations
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -10 }
}

// Button animations
export const buttonHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
}

// Text reveal animation
export const textReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
}

// Viewport animation settings
export const viewportSettings = {
  once: true,
  amount: 0.2,
  margin: '-50px'
}

export const viewportSettingsOnce = {
  once: true,
  amount: 0.1
}
