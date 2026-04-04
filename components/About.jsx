import { MotionReveal } from "./MotionReveal";

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="container px-4 px-md-0">
        <div className="row g-4 align-items-center justify-content-center pt-4 pt-lg-0">
          <div className="col-lg-5 m-0">
            <MotionReveal className="about-copy mb-4" variant="left">
              <h2>
                Gagan Dhawan{" "}
                <span className="inter">
                  is a serial entrepreneur with over 25 years of leadership
                  across print, wellness, consumer brands, education, and
                  devotion-led businesses. His journey combines executional
                  rigour with a deep sense of purpose to build sustainable
                  businesses that create long-term value.
                </span>  
              </h2>
              <span>
                  He is the founder of RHI Printographics, ServDharm, and The
                  New Me, among others. His businesses have served global
                  brands, enabled wellness journeys, transformed devotional
                  publishing, and introduced thoughtful content to a new
                  generation.
                </span>
            </MotionReveal>
          </div>
          <div className="col-lg-7 m-0">
            <MotionReveal
              className="about-image-wrap"
              variant="right"
              delay={0.08}
            >
              <img
                src="/images/portrait.jpg"
                alt="Portrait placeholder"
                className="about-image"
              />
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
