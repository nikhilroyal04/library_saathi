import Faqs from "./faqs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQs | Library Saathi",
  description: "FAQs Library Saathi",
}

export default function FaqsPage() {
  return (
    <Faqs />
  )
}