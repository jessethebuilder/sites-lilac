import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lilac Menu",
  description: "A demo menu for Lilac.",
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="bg-red-700 px-5 py-3 text-center text-sm font-semibold leading-6 text-white">
          Demo only — this website is not associated with any actual business.
        </div>
        {children}
      </body>
    </html>
  );
}
