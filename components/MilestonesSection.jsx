"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { milestones } from "../data/siteData";
import { MotionReveal } from "./MotionReveal";

function DesktopMilestones() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height - viewportHeight;

      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      const calculatedIndex = Math.min(
        milestones.length - 1,
        Math.round(progress * (milestones.length - 1))
      );

      setActiveIndex(calculatedIndex);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const cards = useMemo(() => {
    return milestones.map((item, index) => {
      const offset = index - activeIndex;
      const isActive = index === activeIndex;
      return { ...item, offset, isActive };
    });
  }, [activeIndex]);

  const getCardAnimation = (offset) => {
    if (offset === 0) {
      return {
        x: 0,
        scale: 1.3,
        opacity: 1,
        filter: "blur(0px)",
        zIndex: 5,
      };
    }

    if (offset === -1) {
      return {
        x: -500,
        scale: 0.72,
        opacity: 0.45,
        filter: "blur(1.4px)",
        zIndex: 3,
      };
    }

    if (offset === 1) {
      return {
        x: 500,
        scale: 0.72,
        opacity: 0.45,
        filter: "blur(1.4px)",
        zIndex: 3,
      };
    }

    return {
      x: offset < 0 ? -650 : 650,
      scale: 0.55,
      opacity: 0,
      filter: "blur(3px)",
      zIndex: 1,
    };
  };

  return (
    <section className="milestones-desktop d-none d-lg-block" ref={sectionRef}>
      <div className="milestones-sticky pb-5">
        <div className="container">
          <MotionReveal>
            <h2 className="milestones-title">Milestones</h2>
          </MotionReveal>

          <div className="milestones-stage">
            {cards.map((item) => {
              const animation = getCardAnimation(item.offset);

              return (
                <motion.article
                  key={item.year}
                  className={`milestone-card-desktop ${item.isActive ? "active" : ""}`}
                  animate={{
                    x: animation.x,
                    scale: animation.scale,
                    opacity: animation.opacity,
                    filter: animation.filter,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ zIndex: animation.zIndex }}
                >
                  <div className="milestone-image-wrap">
                    <img src={item.image} alt={item.title} />
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="timeline-line">
            {milestones.map((item, index) => (
              <div key={item.year} className="timeline-dot-wrap">
                <span
                  className={`timeline-dot ${index === activeIndex ? "active" : ""}`}
                />
              </div>
            ))}
          </div>

          <div className="timeline-labels row g-3 align-items-start">
            {milestones.map((item, index) => (
              <div className="col text-center" key={item.year}>
                <div
                  className={`timeline-copy ${index === activeIndex ? "active" : ""}`}
                >
                  <h3>{item.year}</h3>
                  <p>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileMilestones() {
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateActiveIndex = () => {
      const viewportCenter = window.innerHeight * 0.42;
      let closestIndex = 0;
      let closestDistance = Infinity;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        updateActiveIndex();
        ticking = false;
      });
    };

    updateActiveIndex();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const progressHeight =
    milestones.length > 1
      ? `${(activeIndex / (milestones.length - 1)) * 100}%`
      : "100%";

  return (
    <section className="milestones-mobile d-lg-none" id="milestones">
      {/* <MotionReveal>
        <h2 className="milestones-title.mobile">Milestones</h2>
      </MotionReveal> */}
      <div className="container pe-4 pe-md-0">
        <div className="milestones-mobile-grid">
          <div className="milestones-rail">
            <div className="milestones-rail-base" />
            <motion.div
              className="milestones-rail-progress"
              animate={{ height: progressHeight }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>

          <div className="milestones-mobile-items">
            {milestones.map((item, index) => (
              <motion.article
                key={item.year}
                className={`milestone-mobile-item ${index <= activeIndex ? "seen" : ""}`}
                ref={(el) => (itemRefs.current[index] = el)}
                data-index={index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className={`milestone-mobile-dot ${
                    index <= activeIndex ? "active" : ""
                  }`}
                />

                <div className="milestone-mobile-content">
                  <h3>{item.year}</h3>
                  <h4>{item.title}</h4>

                  <motion.div
                    className="milestone-mobile-image-wrap"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img src={item.image} alt={item.title} />
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MilestonesSection() {
  return (
    <>
      <section id="milestones" className="anchor-helper" />
      <DesktopMilestones />
      <MobileMilestones />
    </>
  );
}