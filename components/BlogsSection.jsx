'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { blogs } from '../data/siteData';
import { MotionItem, MotionStagger } from './MotionReveal';

export default function BlogsSection() {
  return (
    <section className="blogs-section" id="blogs">
      <div className="container px-4 px-md-0">
        <MotionStagger>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1.15 },
              576: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.2 },
              992: { slidesPerView: 3 }
            }}
            className="blogs-swiper"
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.slug}>
                <MotionItem variant="up">
                  <article className="blog-card lift-card">
                    <Link href={`/blog/${blog.slug}`} style={{color:"inherit", textDecoration:"none"}}>
                      <div className="blog-card-image-wrap">
                        <img src={blog.image} alt={blog.title} className="blog-card-image" />
                      </div>
                      <h3>{blog.title}</h3>
                      <p>{blog.excerpt}</p>
                      <span className="read-more">Read More &gt;</span>
                    </Link>
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
