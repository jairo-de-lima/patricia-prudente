import Form from "./(home)/page";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

export default function Home() {
  return (
    <main className="flex h-full w-full flex-col">
      <Navbar />
      <Form />
      <Footer />
    </main>
  );
}
