"use client";

import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";
import RegistrationForm from "./_components/form";

export default function HomePage() {
  return (
    <main className="flex min-h-screen min-w-screen flex-col">
      <Navbar />
      <RegistrationForm />
      <Footer />
    </main>
  );
}
