"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ventures } from "../data/siteData";
import { MotionItem, MotionReveal, MotionStagger } from "./MotionReveal";

export default function VenturesCarousel() {
  return (
    <section className="ventures-section" id="ventures">
      <div className="d-md-none">
        <MotionReveal className="section-space-sm" />
        <MotionStagger>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={12}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            centeredSlides={true}
            loop={true}
            slidesPerView={1.2} // important for mobile preview
            breakpoints={{
              0: {
                slidesPerView: 1.2,
                centeredSlides: true,
              },
              576: {
                slidesPerView: 1.6,
                centeredSlides: true, // keep this TRUE
              },
              768: {
                slidesPerView: 2.2,
                centeredSlides: false,
              },
              992: {
                slidesPerView: 3,
                centeredSlides: false,
              },
            }}
            className="ventures-swiper"
          >
            {ventures.map((venture) => (
              <SwiperSlide key={venture.title}>
                <MotionItem variant="up">
                  <article className="venture-card lift-card">
                    <div className="venture-card-image-wrap text-light">
                      <img
                        src={venture.image}
                        alt={venture.title}
                        className="venture-card-image mb-3"
                      />
                      <h3>{venture.title}</h3>
                      <p>{venture.subtitle}</p>
                    </div>
                  </article>
                </MotionItem>
              </SwiperSlide>
            ))}
          </Swiper>
        </MotionStagger>
      </div>
      <div className="d-none d-md-block container">
        <MotionReveal className="section-space-sm" />
        <MotionStagger>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            centeredSlides={true}
            loop={true}
            slidesPerView={1.5}
            breakpoints={{
              0: { slidesPerView: 1.15, centeredSlides: true },
              576: { slidesPerView: 1.6, centeredSlides: false },
              768: { slidesPerView: 2.2, centeredSlides: false },
              992: { slidesPerView: 3, centeredSlides: false },
            }}
            className="ventures-swiper"
          >
            {ventures.map((venture) => (
              <SwiperSlide key={venture.title}>
                <MotionItem variant="up">
                  <article className="venture-card lift-card">
                    <div className="venture-card-image-wrap text-light">
                      <img
                        src={venture.image}
                        alt={venture.title}
                        className="venture-card-image mb-3"
                      />
                      <h3>{venture.title}</h3>
                      <p>{venture.subtitle}</p>
                    </div>
                  </article>
                </MotionItem>
              </SwiperSlide>
            ))}
          </Swiper>
        </MotionStagger>
      </div>
    </section>
  );
}
