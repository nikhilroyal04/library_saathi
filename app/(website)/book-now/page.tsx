import React from 'react'
import { Metadata } from 'next'
import BookNow from "./book-now"

export const metadata: Metadata = {
  title: "Book Now | Library Saathi",
  description: "Book Now Library Saathi",
}

const BookNowPage = () => {
  return (
    <BookNow />
  )
}

export default BookNowPage