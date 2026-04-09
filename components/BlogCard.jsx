import Link from "next/link";
import { formatDate, getOgImage } from "../lib/wordpress";
import { MotionItem, MotionStagger } from "./MotionReveal";

export default function BlogCard({ post }) {
  const image = getOgImage(post);

  return (
      <article className="blog-card-module mb-4 lift-card">
          <Link
            href={`/blogs/${post.slug}`}
            className="blog-card-module__image-link"
          >
            <img
              src={image}
              alt={post?.title?.rendered || "Blog cover"}
              className="blog-card-module__image"
            />
          </Link>

          <div className="blog-card-module__content">
            <p className="blog-card-module__date">{formatDate(post.date)}</p>

            <h3 className="blog-card-module__title">
              <Link href={`/blogs/${post.slug}`}>{post?.title?.rendered}</Link>
            </h3>

            <div
              className="blog-card-module__excerpt line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: post?.excerpt?.rendered || "",
              }}
            />
            <Link href={`/blogs/${post.slug}`} className="blog-featured__cta">
              Read More
            </Link>
          </div>
      </article>
  );
}
