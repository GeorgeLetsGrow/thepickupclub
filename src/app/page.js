import { SocialShell } from '@/components/SocialShell';

export const metadata = {
  title: 'Home | TheBaseballClub',
  description: 'Your pickup baseball feed, upcoming games, activity, and highlights.',
};

export default function HomePage() {
  return <SocialShell activeTab="home" />;
}
