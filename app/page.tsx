// app/page.tsx
"use client";
import { useState } from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";
import BrandsCarousel from "./components/BrandsCarousel";
import Contenido from "./components/Contenido";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import AnnouncementBar from "./components/AnnouncementBar";

export default function Page() {
  const [query, setQuery] = useState("");

  return (
    <>
      <AnnouncementBar />
      <Nav />
      <Header />
      <main className="pt-4 px-4 md:px-8">
        <BrandsCarousel onSearch={setQuery} />
        <section className="mt-12">
          <Contenido query={query} setQuery={setQuery} />
        </section>
      </main>
      <Footer />
      <WhatsAppFloat /> {/* <--- Botón flotante */}
    </>
  );
}