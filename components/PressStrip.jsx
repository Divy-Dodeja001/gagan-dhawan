"use client";
import { publications } from "../data/siteData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function PressStrip() {
  return (
    <section className="press-strip">
      <div className="py-4">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          slidesPerView={1.6}
          spaceBetween={20}
          className="brand-marquee d-flex justify-content-center align-items-center"
          speed={4000} // smooth continuous motion
          autoplay={{
            delay: 0, // IMPORTANT for seamless scroll
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          allowTouchMove={false}
          grabCursor={false}
          breakpoints={{
            576: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            992: {
              slidesPerView: 3.5,
              spaceBetween: 40,
            },
          }}
        >
          {publications.map((src, i) => (
            <SwiperSlide
              key={i}
              className="h-100 d-flex justify-content-center align-items-center"
            >
              <div className="press-slide">
                <img src={src} alt={`logo-${i}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
