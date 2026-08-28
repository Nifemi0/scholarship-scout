import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scholarship Scout",
  description: "Find scholarships that fit, with an agent that shows its work.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
