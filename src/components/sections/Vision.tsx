import { Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/data/site";

export function Vision() {
  return (
    <section id="visi" className="bg-forest relative isolate overflow-hidden py-20 lg:py-28">
      <div className="bg-gold/10 absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl" />
      <div className="bg-emerald/20 absolute -bottom-32 -left-24 h-80 w-80 rounded-full blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <Quote className="text-gold mx-auto h-10 w-10" aria-hidden="true" />
          <h2 className="text-gold mt-6 text-xs font-semibold tracking-[0.3em] uppercase">
            Visi IAIKU Cirebon
          </h2>
          <blockquote className="font-display mt-8 text-2xl leading-snug text-white sm:text-3xl lg:text-[2.6rem]">
            &ldquo;{SITE.visi}&rdquo;
          </blockquote>
          <div className="bg-gold mx-auto mt-10 h-px w-24" />
        </Reveal>
      </div>
    </section>
  );
}
