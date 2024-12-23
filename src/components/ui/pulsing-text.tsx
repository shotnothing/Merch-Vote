import { motion } from 'framer-motion';

interface PulsingTextProps {
  text: string;
  className?: string;
}

export function PulsingText({ text, className }: PulsingTextProps) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {text}
    </motion.div>
  );
}

