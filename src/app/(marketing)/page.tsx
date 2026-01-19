import { FeaturesGrid } from "./_components/features-grid";
import { HeroSection } from "./_components/hero-section";
import { Testimonial } from "./_components/testimonial";

export default function MarketingPage() {
  return (
    <section className="mx-auto grid lg:h-[calc(100dvh-108px)] w-full gap-2 md:gap-4 lg:grid-cols-12 grid-rows-8 xs:grid-rows-6 lg:grid-rows-3">
      <HeroSection />
      <FeaturesGrid />
      <Testimonial />
    </section>
  );
}
