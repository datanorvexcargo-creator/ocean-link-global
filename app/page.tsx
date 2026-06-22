import { HeroSequence } from '@/components/hero/HeroSequence';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { Capabilities } from '@/components/sections/Capabilities';
import { RoutesGlobe } from '@/components/sections/RoutesGlobe';
import { ProcessFlow } from '@/components/sections/ProcessFlow';
import { Industries } from '@/components/sections/Industries';
import { Manifesto } from '@/components/sections/Manifesto';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTABanner } from '@/components/sections/CTABanner';
import { Footer } from '@/components/sections/Footer';

export default function Page() {
  return (
    <main className="relative">
      <HeroSequence />
      <TrustStrip />
      <Capabilities />
      <RoutesGlobe />
      <ProcessFlow />
      <Industries />
      <Manifesto />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  );
}
