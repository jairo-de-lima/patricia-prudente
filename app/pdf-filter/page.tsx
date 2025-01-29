"use client";
import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";
import FilterAndPDFGenerator from "./_components/FilterAndPDFGenerator";

const PDFpage = () => {
  return (
    <div className="flex min-h-screen min-w-screen flex-col">
      <Navbar />
      <FilterAndPDFGenerator />
      <Footer />
    </div>
  );
};

export default PDFpage;
