import { notFound } from "next/navigation";
import {
  formatDate,
  getAllPosts,
  getOgImage,
  getPostById,
  stripHtml,
} from "../../../lib/wordpress";
import "../../../styles/blog.css";
import { blogPosts } from "../../../data/siteData.js";
import ContactSection from "../../../components/ContactSection.jsx";
import Breadcrumbs from "../../../components/Breadcrumbs.jsx";

async function getPostFromSlug(slug) {
  const posts = blogPosts;
  const matched = posts.find((post) => post.slug === slug);

  if (!matched) return null;

  const post = matched;
  return post;
}

export async function generateMetadata({ params }) {
  const post = await getPostFromSlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const yoast = post?.yoast_head_json || {};
  const ogImage = yoast?.og_image?.[0]?.url;

  return {
    title: yoast.title || stripHtml(post?.title?.rendered) || "Blog",
    description:
      yoast.description || stripHtml(post?.excerpt?.rendered) || "Blog post",
    alternates: {
      canonical: yoast.canonical || `https://gagandhawan.me/${post.slug}/`,
    },
    robots: yoast.robots || {
      index: true,
      follow: true,
    },
    openGraph: {
      title: yoast.og_title || yoast.title || stripHtml(post?.title?.rendered),
      description:
        yoast.og_description ||
        yoast.description ||
        stripHtml(post?.excerpt?.rendered),
      url: yoast.og_url || `https://gagandhawan.me/${post.slug}/`,
      siteName: yoast.og_site_name || "Gagan Dhawan",
      locale: yoast.og_locale || "en_US",
      type: yoast.og_type || "article",
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: yoast.twitter_card || "summary_large_image",
      title: yoast.og_title || yoast.title || stripHtml(post?.title?.rendered),
      description:
        yoast.og_description ||
        yoast.description ||
        stripHtml(post?.excerpt?.rendered),
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const post = await getPostFromSlug(params.slug);

  if (!post) notFound();

  const image = getOgImage(post);

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
      <main className="blog-detail-module">
        <article className="blog-detail-module__article">
          <div className="container blog-detail-module__container">
            <p className="blog-detail-module__date">{formatDate(post.date)}</p>

            <h1
              className="blog-detail-module__title"
              dangerouslySetInnerHTML={{ __html: post?.title?.rendered || "" }}
            />

            {image ? (
              <div className="blog-detail-module__cover-wrap">
                <img
                  src={image}
                  alt={stripHtml(post?.title?.rendered || "Blog cover")}
                  className="blog-detail-module__cover"
                />
              </div>
            ) : null}

            <div
              className="blog-detail-module__excerpt"
              dangerouslySetInnerHTML={{
                __html: post?.excerpt?.rendered || "",
              }}
            />

            <div
              className="blog-detail-module__content"
              dangerouslySetInnerHTML={{
                __html: post?.content?.rendered || "",
              }}
            />
          </div>
        </article>
      </main>
      <ContactSection/>
    </>
  );
}
