"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { socialLinks } from "../data/siteData";
import { MotionItem, MotionReveal, MotionStagger } from "./MotionReveal";

const initialState = { name: "", email: "", message: "" };

export default function ContactSection() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    error: false,
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", error: false });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setStatus({
        loading: false,
        message: "Message sent successfully.",
        error: false,
      });
      setForm(initialState);
    } catch (error) {
      setStatus({
        loading: false,
        message: error.message || "Failed to send message.",
        error: true,
      });
    }
  };

  return (
    <>
      <section className="contact-section" id="contact">
        <div className="container px-4 px-md-0">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <MotionReveal className="contact-copy" variant="left">
                <p className="inter mb-3">
                  Interested in working
                  <br />
                  together or learning more?
                </p>
                <h2 className="inter">Let’s connect.</h2>
              </MotionReveal>
            </div>
            <div className="col-lg-7">
              <MotionReveal
                className="contact-form-wrap"
                variant="right"
                delay={0.06}
              >
                <form onSubmit={handleSubmit} className="contact-form">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="submit"
                    className="btn submit-btn-contact"
                    disabled={status.loading}
                  >
                    {status.loading ? "Sending..." : "Submit"}
                  </button>
                  {status.message ? (
                    <p
                      className={`form-status ${status.error ? "error" : "success"}`}
                    >
                      {status.message}
                    </p>
                  ) : null}
                </form>

                <MotionStagger
                  className="social-bar d-none d-md-block"
                  stagger={0.08}
                  delay={0.1}
                >
                  {socialLinks.map((item) => (
                    <MotionItem key={item.icon} variant="up">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.icon}
                      >
                        <Icon icon={item.icon} width="18" height="18" />
                      </a>
                    </MotionItem>
                  ))}
                </MotionStagger>
              </MotionReveal>
            </div>
          </div>
        </div>
      </section>
      <div className="d-lg-none">
        <MotionStagger className="social-bar" stagger={0.08} delay={0.1}>
          {socialLinks.map((item) => (
            <MotionItem key={item.icon} variant="up">
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.icon}
              >
                <Icon icon={item.icon} width="18" height="18" />
              </a>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </>
  );
}
