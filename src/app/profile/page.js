import { SocialShell } from '@/components/SocialShell';

export const metadata = {
  title: 'Profile | TheBaseballClub',
  description: 'Review your pickup baseball games, highlights, stats, and saved posts.',
};

export default function ProfilePage() {
  return <SocialShell activeTab="profile" />;
}
