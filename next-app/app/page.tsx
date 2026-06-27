import { Hero } from '@/components/Hero';
import { WelcomeSection } from '@/components/WelcomeSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { InstagramSection } from '@/components/InstagramSection';
import { AboutSection } from '@/components/AboutSection';
import { ReserveSection } from '@/components/ReserveSection';
import { LocationSection } from '@/components/LocationSection';

export default function Page() {
  return (
    <main>
      <Hero />
      <WelcomeSection />
      <ReviewsSection />
      <InstagramSection />
      <AboutSection />
      <ReserveSection />
      <LocationSection />
    </main>
  );
}
