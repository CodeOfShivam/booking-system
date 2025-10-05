import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteConfig = {
  name: "DashTrix",
  title: "DashTrix - Admin Dashboard Template",
  url: "https://dashtrix.com",
  ogImage: "https://dashtrix.com/og.jpg",
  description:
    "DashTrix is a powerful and flexible admin dashboard template designed for modern web applications. With a clean UI and responsive layout, DashTrix helps you manage your data efficiently.",
  links: {
    twitter: "https://twitter.com/dashtrix",
    instagram: "https://www.instagram.com/dashtrix",
  },
  logo: "/logo.png",
  mode: MODE.LIGHT,
  icon: "/logo-short.png",
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - DashTrix` : siteConfig.name,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - DashTrix` : title,
      description,
      url: "https://dashtrix.com",
      siteName: "DashTrix",
      images: {
        url: "https://dashtrix.com/og.jpg",
        width: 1200,
        height: 630,
      },
      locale: "en_US",
      type: "website",
    },
  };
};
