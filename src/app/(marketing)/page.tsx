"use client";

import {
  HeroSection,
  FeaturesGrid,
  Testimonial,
} from "@/app/(marketing)/_components";

export default function MarketingPage() {
  return (
    <section className="mx-auto grid h-[calc(100dvh-128px)] w-full gap-5 grid-cols-12 grid-rows-3">
      <HeroSection />
      <FeaturesGrid />
      <Testimonial />
    </section>
  );
}
