import Link from "next/link";
import BlogCard from "../../components/BlogCard.jsx";
import { formatDate, getAllPosts, getOgImage } from "../../lib/wordpress.js";
import "../../styles/blog.css";
import Header from "../../components/Header.jsx";
import ContactSection from "../../components/ContactSection.jsx";
import { blogPosts } from "../../data/siteData.js";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";

export const metadata = {
  title: "Blogs",
  description: "Latest blog posts",
};

export default async function BlogIndexPage() {
  const posts = blogPosts;

  if (!posts?.length) {
    return (
      <main className="blog-index-page">
        <div className="container py-5">
          <h1>No posts found</h1>
        </div>
      </main>
    );
  }

  const [featuredPost, ...restPosts] = posts;
  const featuredImage = getOgImage(featuredPost);

  return (
    <>
      <header className="site-header py-1">
        <div className="container px-4 px-md-0">
          <div className="header-shell d-flex justify-content-center">
            <a href="/" className="brand">
              Gagan Dhawan
            </a>
          </div>
        </div>
      </header>
      <Breadcrumbs/>
      <main className="blog-index-page pb-4">
        <section className="blog-featured">
          <div className="container">
            <div className="blog-featured__grid">
              <div className="blog-featured__image-wrap">
                <Link href={`/blogs/${featuredPost.slug}`}>
                  <img
                    src={featuredImage}
                    alt={featuredPost?.title?.rendered || "Featured blog"}
                    className="blog-featured__image"
                  />
                </Link>
              </div>

              <div className="blog-featured__content">
                <p className="blog-featured__eyebrow">Featured Post</p>
                <p className="blog-featured__date">
                  {formatDate(featuredPost.date)}
                </p>

                <h1 className="blog-featured__title">
                  <Link href={`/blogs/${featuredPost.slug}`}>
                    {featuredPost?.title?.rendered}
                  </Link>
                </h1>

                <div
                  className="blog-featured__excerpt"
                  dangerouslySetInnerHTML={{
                    __html: featuredPost?.excerpt?.rendered || "",
                  }}
                />

                <Link
                  href={`/blogs/${featuredPost.slug}`}
                  className="blog-featured__cta"
                >
                  Read full article
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="blog-listing">
          <div className="container">
            <div className="blog-listing__grid">
              {restPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <ContactSection />
    </>
  );
}
