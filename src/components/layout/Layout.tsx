import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      {/* Pages handle their own top spacing — hero needs full viewport with no offset */}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
