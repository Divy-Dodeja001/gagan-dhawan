import { Inter, Zen_Antique } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable:"--font-inter", weight: ["400"] });
const zenAntique = Zen_Antique({
  subsets: ["latin"],
  variable: "--font-zen-antique",
  weight: ["400"],
});

export const metadata = {
  title: "Gagan Dhawan",
  description: "Entrepreneur. Builder. Author. Investor.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${zenAntique.variable} ${inter.variable}`}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
