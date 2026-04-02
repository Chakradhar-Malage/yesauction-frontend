export const getAuctionStatus = (endTime: string) => {
  const now = new Date().getTime();
  const end = new Date(endTime).getTime();

  if (end < now) return "ENDED";
  return "LIVE";
};