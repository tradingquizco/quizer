import type { Metadata } from "next";
import "./globals.css";
import LayoutProvider from "@/providers/LayoutProvider";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Create Quiz",
  description: "best paltform for learing trade",
  icons: {
    icon:'/logo.svg',
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
