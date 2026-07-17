import { Hero } from '@/components/Hero';
import { TasteDivider } from '@/components/TasteDivider';
import { WelcomeSection } from '@/components/WelcomeSection';
import { MenuTeaser } from '@/components/MenuTeaser';
import { ReviewsSection } from '@/components/ReviewsSection';
import { InstagramSection } from '@/components/InstagramSection';
import { ReserveSection } from '@/components/ReserveSection';
import { LocationSection } from '@/components/LocationSection';

export default function Page() {
  return (
    <main>
      <Hero />
      <TasteDivider />
      <WelcomeSection />
      <MenuTeaser />
      <ReviewsSection />
      <InstagramSection />
      <ReserveSection />
      <LocationSection />
    </main>
  );
}
