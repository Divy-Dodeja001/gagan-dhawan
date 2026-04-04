import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogs } from '../../../data/siteData';
import { MotionReveal } from '../../../components/MotionReveal';

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export function generateMetadata({ params }) {
  const blog = blogs.find((item) => item.slug === params.slug);
  return {
    title: blog ? `${blog.title} | Gagan Dhawan` : 'Blog | Gagan Dhawan'
  };
}

export default function BlogDetailPage({ params }) {
  const blog = blogs.find((item) => item.slug === params.slug);

  if (!blog) notFound();

  const paragraphs = blog.content.split('\n\n');

  return (
    <main className="blog-detail-page">
      <section className="blog-topbar">
        <div className="container d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <Link href="/" className="blog-back-link">← Back to Home</Link>
          <span className="blog-brand">Gagan Dhawan</span>
        </div>
      </section>

      <article className="blog-article">
        <div className="container blog-container">
          <MotionReveal>
            <p className="blog-date">{blog.date}</p>
            <h1>{blog.title}</h1>
          </MotionReveal>
          <MotionReveal className="blog-cover-wrap" variant="zoom" delay={0.08}>
            <img src={blog.image} alt={blog.title} className="blog-cover-image" />
          </MotionReveal>
          <div className="blog-content">
            {paragraphs.map((para, index) => (
              <MotionReveal key={index} delay={Math.min(index * 0.03, 0.18)}>
                <p>{para}</p>
              </MotionReveal>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
