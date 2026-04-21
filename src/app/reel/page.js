import { SocialShell } from '@/components/SocialShell';

export const metadata = {
  title: 'Reel | The PickUp Club',
  description: 'Watch highlights and recaps from recent pickup baseball games.',
};

export default function ReelPage() {
  return <SocialShell activeTab="reel" />;
}
