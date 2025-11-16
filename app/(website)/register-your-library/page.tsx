import RegisterYourLibrary from "./register-your-library"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register Your Library | Library Saathi",
  description: "Register your library with Library Saathi and start managing your library efficiently",
}

export default function RegisterPage() {
  return (
    <RegisterYourLibrary />
  )
}

