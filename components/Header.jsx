'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks } from '../data/siteData';

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleNavClick = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container px-4 px-md-0">
        <div className="header-shell">
          <a href="#top" className="brand">Gagan Dhawan</a>

          <nav className="desktop-nav d-none d-lg-flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link-custom">
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className="mobile-menu-toggle d-lg-none"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <Icon icon={open ? 'mdi:close' : 'mdi:menu'} width="24" height="24" />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              className="mobile-dropdown open"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <nav className="mobile-nav d-flex flex-column">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={handleNavClick}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, delay: index * 0.04 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
