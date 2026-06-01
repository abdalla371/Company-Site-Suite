import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
