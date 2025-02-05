import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دستیار هوشمند جذب همکار",
  description: "دستیار هوشمند جذب همکار",
  authors: [
    { name: "Reza Shahnazar", url: "https://github.com/rezashahnazar" },
  ],
  creator: "Reza Shahnazar",
  metadataBase: new URL("https://job.shahnazar.me"),
  openGraph: {
    title: "دستیار هوشمند جذب همکار",
    description: "دستیار هوشمند جذب همکاران",
    type: "website",
    url: "https://job.shahnazar.me",
    siteName: "دستیار هوشمند جذب همکار",
    images: [
      {
        url: "https://job.shahnazar.me/opengraph-image",
        width: 1200,
        height: 630,
        alt: "وبسایت شخصی رضا شاه‌نظر",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "دستیار هوشمند جذب همکار",
    description: "دستیار هوشمند جذب همکاران",
    images: ["https://job.shahnazar.me/opengraph-image"],
  },
};
