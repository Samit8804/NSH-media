import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NSH Media",
    short_name: "NSH Media",
    description:
      "We craft digital experiences that drive growth. From web development to AI automation, we help businesses thrive in the digital landscape.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    icons: [
      { src: "/images/logo.png", sizes: "192x192", type: "image/png" },
      { src: "/images/logo.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
