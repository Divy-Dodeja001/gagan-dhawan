"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { blogPosts } from "../data/siteData";
import { MotionItem, MotionStagger } from "./MotionReveal";
import { getOgImage } from "../lib/wordpress";

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
              992: { slidesPerView: 3 },
            }}
            className="blogs-swiper"
          >
            {blogPosts.slice(0, 3).map((post) => (
              <SwiperSlide key={post.slug}>
                <MotionItem variant="up">
                  <article className="blog-card lift-card">
                    <Link
                      href={`/blogs/${post.slug}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <div className="blog-card-image-wrap">
                        <img
                          src={getOgImage(post)}
                          alt={post?.title?.rendered || "Blog cover"}
                          className="blog-card-image"
                        />
                      </div>
                      <h3>{post?.title?.rendered}</h3>
                      <div
                        className="blog-card-module__excerpt line-clamp-2 mb-2"
                        dangerouslySetInnerHTML={{
                          __html: post?.excerpt?.rendered || "",
                        }}
                      />
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
