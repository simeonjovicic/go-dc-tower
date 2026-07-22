import { Hero } from '@/components/Hero';
import { ScrollStory } from '@/components/ScrollStory';
import { WelcomeSection } from '@/components/WelcomeSection';
import { MenuTeaser } from '@/components/MenuTeaser';
import { ReviewsSection } from '@/components/ReviewsSection';
import { InstagramSection } from '@/components/InstagramSection';
import { ReserveSection } from '@/components/ReserveSection';
import { LocationSection } from '@/components/LocationSection';
import { KineticStrip } from '@/components/KineticStrip';

export default function Page() {
  return (
    <main>
      <Hero />
      <ScrollStory />
      <KineticStrip />
      <MenuTeaser />
      <WelcomeSection />
      <ReviewsSection />
      <InstagramSection />
      <ReserveSection />
      <LocationSection />
    </main>
  );
}
