import About from "./about"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Library Saathi",
  description: "About Library Saathi",
}

export default function AboutPage() {
  return (
    <About />
  )
}