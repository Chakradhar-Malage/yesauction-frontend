import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  CircleAlert,
  Eye,
  Gavel,
  LockKeyhole,
  Pencil,
  ShieldCheck,
  ShoppingBag,
  Star,
  Trophy,
} from "lucide-react";

import { useCurrentUser } from "../hooks/useCurrentUser";
import { useMyAuctions } from "../hooks/useMyAuctions";
import { useMyBids } from "../hooks/useMyBids";

type IconComponent = typeof Gavel;

function StatCard({
  label,
  value,
  icon: Icon,
  onClick,
}: {
  label: string;
  value: number | undefined;
  icon: IconComponent;
  onClick?: () => void;
}) {
  const content = (
    <div className="flex items-center gap-4 text-left">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center
                   rounded-lg bg-blue-50 text-blue-600"
      >
        <Icon
          className="h-5 w-5"
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0">
        <p className="text-sm text-gray-500">{label}</p>

        <h2 className="mt-1 text-2xl font-semibold text-gray-900">
          {value ?? "—"}
        </h2>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full rounded-xl border bg-white p-5 shadow-sm
                   transition hover:border-blue-300 hover:bg-blue-50
                   hover:shadow-md focus:outline-none
                   focus:ring-2 focus:ring-blue-500
                   focus:ring-offset-2"
      >
        {content}
      </button>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      {content}
    </div>
  );
}

function Avatar({ username }: { username: string | undefined }) {
  const initial = username?.charAt(0)?.toUpperCase() || "?";

  return (
    <div
      className="flex h-20 w-20 shrink-0 items-center justify-center
                 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600
                 text-2xl font-semibold text-white shadow-sm"
      aria-label={`Avatar for ${username ?? "user"}`}
    >
      {initial}
    </div>
  );
}

function VerificationRow({
  label,
  verified,
  description,
}: {
  label: string;
  verified: boolean;
  description: string;
}) {
  return (
    <div
      className="flex items-center justify-between gap-4
                 border-b py-4 last:border-b-0"
    >
      <div className="min-w-0">
        <p className="font-medium text-gray-900">{label}</p>

        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>
      </div>

      {verified ? (
        <span
          className="inline-flex shrink-0 items-center gap-1.5
                     rounded-full bg-green-50 px-3 py-1
                     text-sm font-medium text-green-600"
        >
          <CheckCircle2
            className="h-4 w-4"
            aria-hidden="true"
          />
          Verified
        </span>
      ) : (
        <span
          className="inline-flex shrink-0 items-center gap-1.5
                     rounded-full bg-red-50 px-3 py-1
                     text-sm font-medium text-red-600"
        >
          <CircleAlert
            className="h-4 w-4"
            aria-hidden="true"
          />
          Not Verified
        </span>
      )}
    </div>
  );
}

function ActionCard({
  icon: Icon,
  title,
  description,
  onClick,
}: {
  icon: IconComponent;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-xl border bg-white p-4 text-left
                 transition hover:border-blue-300 hover:bg-blue-50
                 hover:shadow-sm focus:outline-none
                 focus:ring-2 focus:ring-blue-500
                 focus:ring-offset-2"
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center
                     rounded-lg bg-gray-100 text-gray-700
                     transition group-hover:bg-blue-100
                     group-hover:text-blue-600"
        >
          <Icon
            className="h-5 w-5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0">
          <p className="font-medium text-gray-900">
            {title}
          </p>

          <p className="mt-1 text-xs leading-relaxed text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}

export default function Profile() {
  const navigate = useNavigate();

  const { user, loading } = useCurrentUser();
  const { auctions } = useMyAuctions();
  const { bids } = useMyBids();

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl animate-pulse px-6 py-10">
        <div className="mb-6 h-32 rounded-xl bg-gray-200" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="h-24 rounded-xl bg-gray-200" />
          <div className="h-24 rounded-xl bg-gray-200" />
          <div className="h-24 rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-20 text-center text-gray-500">
        Unable to load profile.
      </div>
    );
  }

  const myAuctionsCount = auctions?.length ?? 0;
  const myBidsCount = bids?.length ?? 0;

  /*
   * These values can later come from your backend.
   * Keeping them separate makes it easy to replace them
   * when the corresponding APIs are available.
   */
  const wonAuctionsCount = 0;
  const watchlistCount = 0;
  const soldItemsCount = 0;

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-6 py-10">

      {/* PROFILE HEADER */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Avatar username={user.username} />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                {user.username}
              </h1>

              <span
                className="rounded-full bg-gray-100 px-3 py-1
                           text-xs font-medium text-gray-700"
              >
                {user.role}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              {user.email}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {user.mobileNumberVerified && (
                <span
                  className="inline-flex items-center gap-1.5
                             rounded-full bg-green-50 px-3 py-1
                             text-xs font-medium text-green-700"
                >
                  <CheckCircle2
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                  Mobile verified
                </span>
              )}

              <span
                className="inline-flex items-center gap-1.5
                           rounded-full bg-green-50 px-3 py-1
                           text-xs font-medium text-green-700"
              >
                <CheckCircle2
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
                Email account
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/edit-profile")}
            className="inline-flex items-center gap-2 rounded-lg border
                       px-4 py-2 text-sm font-medium text-gray-700
                       transition hover:bg-gray-100
                       focus:outline-none focus:ring-2
                       focus:ring-blue-500 focus:ring-offset-2"
          >
            <Pencil
              className="h-4 w-4"
              aria-hidden="true"
            />
            Edit Profile
          </button>
        </div>
      </div>

      {/* AUCTION STATS */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Auction Activity
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="My Auctions"
            value={myAuctionsCount}
            icon={Gavel}
            onClick={() => navigate("/my-auctions")}
          />

          <StatCard
            label="Active Bids"
            value={myBidsCount}
            icon={Eye}
            onClick={() => navigate("/my-bids")}
          />

          <StatCard
            label="Won Auctions"
            value={wonAuctionsCount}
            icon={Trophy}
            onClick={() => navigate("/won-auctions")}
          />

          <StatCard
            label="Watchlist"
            value={watchlistCount}
            icon={Star}
            onClick={() => navigate("/watchlist")}
          />

          <StatCard
            label="Sold Items"
            value={soldItemsCount}
            icon={ShoppingBag}
            onClick={() => navigate("/seller")}
          />
        </div>
      </section>

      {/* TRUST & SAFETY */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Trust & Safety
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Verification helps keep our auction marketplace safe.
            </p>
          </div>

          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center
                       rounded-lg bg-blue-50 text-blue-600"
          >
            <ShieldCheck
              className="h-6 w-6"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mt-4">
          <VerificationRow
            label="Email Address"
            verified={true}
            description="Your account email is available."
          />

          <VerificationRow
            label="Mobile Number"
            verified={user.mobileNumberVerified}
            description={
              user.mobileNumberVerified
                ? "Your mobile number is verified."
                : "Verify your mobile number to increase account security."
            }
          />

          <VerificationRow
            label="Identity Verification"
            verified={false}
            description="Identity verification has not been completed."
          />
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/verification")}
            className="inline-flex items-center gap-1.5 text-sm
                       font-medium text-blue-600 transition
                       hover:text-blue-700 hover:underline
                       focus:outline-none"
          >
            Manage Verification
            <ArrowRight
              className="h-4 w-4"
              aria-hidden="true"
            />
          </button>
        </div>
      </section>

      {/* SELLER REPUTATION */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Seller Reputation
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Build trust with buyers through successful sales.
            </p>
          </div>

          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center
                       rounded-lg bg-yellow-50 text-yellow-500"
          >
            <Star
              className="h-6 w-6 fill-yellow-400"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-2xl font-semibold text-gray-900">
              —
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Rating
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-2xl font-semibold text-gray-900">
              0
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Reviews
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-2xl font-semibold text-gray-900">
              {soldItemsCount}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Items Sold
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-2xl font-semibold text-gray-900">
              {myAuctionsCount}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Auctions
            </p>
          </div>
        </div>
      </section>

      {/* ACCOUNT DETAILS */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Account Details
          </h2>

          <button
            type="button"
            onClick={() => navigate("/edit-profile")}
            className="inline-flex items-center gap-1.5 text-sm
                       font-medium text-blue-600
                       hover:text-blue-700 hover:underline
                       focus:outline-none"
          >
            <Pencil
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />
            Edit
          </button>
        </div>

        <div className="grid gap-5 text-sm sm:grid-cols-2">
          <div>
            <p className="text-gray-500">Username</p>
            <p className="mt-1 font-medium text-gray-900">
              {user.username}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="mt-1 font-medium text-gray-900">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Role</p>
            <p className="mt-1 font-medium text-gray-900">
              {user.role}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Mobile Verified</p>
            <p className="mt-1 font-medium text-gray-900">
              {user.mobileNumberVerified ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Account & Security
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage your profile, verification, and security settings.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <ActionCard
            icon={Pencil}
            title="Edit Profile"
            description="Update your personal information."
            onClick={() => navigate("/edit-profile")}
          />

          <ActionCard
            icon={BadgeCheck}
            title="Verification"
            description="Manage account verification."
            onClick={() => navigate("/verification")}
          />

          <ActionCard
            icon={LockKeyhole}
            title="Security"
            description="Password, 2FA and sessions."
            onClick={() => navigate("/security")}
          />
        </div>
      </section>
    </div>
  );
}