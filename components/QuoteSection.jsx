import { MotionReveal } from './MotionReveal';

export default function QuoteSection() {
  return (
    <section className="quote-section">
      <div className="container position-relative py-5">
        <MotionReveal className="quote-accent quote-accent-top" variant="down" />
        <MotionReveal className="quote-accent quote-accent-bottom" variant="up" delay={0.08} />
        <MotionReveal className="quote-inner" variant="zoom">
          <blockquote>“Strong Companies are Built by Strong Habits.”</blockquote>
          <p>- Gagan Dhawan</p>
        </MotionReveal>
      </div>
    </section>
  );
}
