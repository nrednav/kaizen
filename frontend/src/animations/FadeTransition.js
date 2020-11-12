import React from 'react';
import { motion } from 'framer-motion';

const fadeTransition = {
  in: { opacity: 1 },
  out: { opacity: 0 },
};

export const FadeTransition = ({ children }) => {
  return (
    <motion.div exit='out' animate='in' initial='out' variants={fadeTransition}>
      {children}
    </motion.div>
  );
};
