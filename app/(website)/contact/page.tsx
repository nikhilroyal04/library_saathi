import Contact from "./contact"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Library Saathi",
  description: "Contact Library Saathi",
}

export default function ContactPage() {
  return (
    <Contact />
  )
}