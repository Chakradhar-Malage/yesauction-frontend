import { useCurrentUser } from "../hooks/useCurrentUser";
import { useProfileStats } from "../hooks/useProfileStats";
import { User } from "../types/User";

import ProfileHeader from "../Components/Profile/ProfileHeader";
import ProfileStats from "../Components/Profile/ProfileStats";
import TrustSafety from "../Components/Profile/TrustSafety";
import SellerReputation from "../Components/Profile/SellerReputation";
import AccountDetails from "../Components/Profile/AccountDetails";
import AccountActions from "../Components/Profile/AccountActions";
import ProfileSkeleton from "../Components/Profile/ProfileSkeleton";

function ProfileContent({ user }: { user: User }) {
  const stats = useProfileStats(user);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-6 py-10">
      <ProfileHeader user={user} />
      <ProfileStats stats={stats} />
      <TrustSafety user={user} />
      <SellerReputation stats={stats} />
      <AccountDetails user={user} />
      <AccountActions />
    </div>
  );
}

export default function Profile() {
  const { user, loading } = useCurrentUser();

  if (loading) return <ProfileSkeleton />;

  if (!user) {
    return (
      <div className="py-20 text-center text-gray-500">
        Unable to load profile.
      </div>
    );
  }

  return <ProfileContent user={user} />;
}