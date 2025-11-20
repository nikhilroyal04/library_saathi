import Gallery from "./gallery"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery | Library Saathi",
  description: "Gallery Library Saathi",
}

export default function GalleryPage() {
  return (
    <Gallery />
  )
}