import { Variants, Transition } from 'framer-motion';

export const listItemTransition: Transition = {
  duration: 0.3,
  type: 'spring',
  stiffness: 300,
  damping: 25
};

export const getListItemVariants = (index: number): Variants => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { ...listItemTransition, delay: index * 0.05 }
  },
  exit: { opacity: 0, y: -20, transition: listItemTransition }
});

export const textVariants: Variants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

export const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 }
  }
};

export const buttonVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.4 }
  }
};
