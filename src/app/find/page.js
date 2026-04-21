import { SocialShell } from '@/components/SocialShell';

export const metadata = {
  title: 'Find a Game | TheBaseballClub',
  description: 'Search nearby pickup baseball games and browse open roster spots.',
};

export default function FindPage() {
  return <SocialShell activeTab="find" />;
}
