import { createFileRoute } from "@tanstack/react-router";

import { listPublishedNews } from "@/lib/news.functions";

import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Vision } from "@/components/sections/Vision";
import { Mission } from "@/components/sections/Mission";
import { Goals } from "@/components/sections/Goals";
import { Faculties } from "@/components/sections/Faculties";
import { Advantages } from "@/components/sections/Advantages";
import { Facilities } from "@/components/sections/Facilities";
import { Tuition } from "@/components/sections/Tuition";
import { Lecturers } from "@/components/sections/Lecturers";
import { Admissions } from "@/components/sections/Admissions";
import { News } from "@/components/sections/News";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { FloatingActions } from "@/components/FloatingActions";

const TITLE = "IAIKU Cirebon | Institut Agama Islam Kanzul Ulum Cirebon";
const DESC =
  "Institut Agama Islam Kanzul Ulum Cirebon merupakan perguruan tinggi Islam berbasis pesantren, teknologi digital, dan kearifan lokal dengan visi berdaya saing global.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollegeOrUniversity",
          name: "Institut Agama Islam Kanzul Ulum Cirebon",
          alternateName: "IAIKU Cirebon",
          slogan: "Kearifan Lokal Berdaya Saing Global",
          url: "https://iaikucrb.ac.id",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Jl. Pemuda No. 33, Sunyaragi, Kec. Kesambi",
            addressLocality: "Kota Cirebon",
            addressRegion: "Jawa Barat",
            postalCode: "45132",
            addressCountry: "ID",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Vision />
        <Mission />
        <Goals />
        <Faculties />
        <Advantages />
        <Facilities />
        <Tuition />
        <Lecturers />
        <Admissions />
        <News />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
