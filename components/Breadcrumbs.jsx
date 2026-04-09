"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles/breadcrumbs.css";

function formatSegment(segment) {
  return decodeURIComponent(segment)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Breadcrumbs({
  className = "",
  separator = "/",
  homeLabel = "Home",
  overrides = {},
  hiddenPaths = [],
}) {
  const pathname = usePathname();

  if (!pathname || hiddenPaths.includes(pathname)) return null;

  const segments = pathname.split("/").filter(Boolean);

  const crumbs = [
    {
      label: homeLabel,
      href: "/",
    },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        label: overrides[href] || formatSegment(segment),
        href,
      };
    }),
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className={`breadcrumb-wrap ${className} `}
      style={{ background: "#f6f3ee" }}
    >
      <ol className="breadcrumb-list container pt-4">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li
              key={crumb.href}
              className={`breadcrumb-item ${isLast ? "active" : ""}`}
            >
              {isLast ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <Link href={crumb.href}>{crumb.label}</Link>
              )}

              {!isLast && (
                <span className="breadcrumb-separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
