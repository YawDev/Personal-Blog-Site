import NavBar from "@/components/shared/NavBar";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import { AuthProvider } from "@/providers/auth-provider";

export const metadata: Metadata = {
  title: "Personal Blog",
  description: "Personal Blog Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* min-h-screen ensures the body takes up at least the full height of the viewport */}
      <body className="flex flex-col min-h-screen">
        <AuthProvider initialUser={null}>
          <NavBar />
          {/* flex-grow pushes the footer down by taking up all available space */}
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
