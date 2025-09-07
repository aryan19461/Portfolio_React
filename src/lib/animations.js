export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
export const stagger = { show: { transition: { staggerChildren: 0.12 } } };
export const hoverLift = { y: -4, scale: 1.02, transition: { type: 'spring', stiffness: 260, damping: 18 } };
