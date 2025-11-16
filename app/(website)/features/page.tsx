import Features from "./features"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Features | Library Saathi",
  description: "Features Library Saathi",
}

export default function FeaturesPage() {
  return (
    <Features />
  )
}