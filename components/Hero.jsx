'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="hero-section" id="top">
      <div className="container px-4 px-md-0">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Entrepreneur. Builder. Author. Investor.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            Shaping ventures with purpose and passion across industries.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href="#ventures" className="btn btn-dark btn-hero-primary rounded-0">Explore Ventures</a>
            <a href="#about" className="btn btn-secondary btn-hero-secondary rounded-0">Read More About Gagan</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
