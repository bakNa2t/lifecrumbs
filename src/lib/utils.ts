import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const currentDate = new Date();
  const inputDate = new Date(dateStr);

  const timeDiff = currentDate.getTime() - inputDate.getTime();
  const secondsDiff = timeDiff / 1000;

  if (secondsDiff < 60) {
    return `${Math.floor(secondsDiff)} seconds ago`;
  } else if (secondsDiff < 3600) {
    const minutes = Math.floor(secondsDiff / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (secondsDiff < 86400) {
    const hours = Math.floor(secondsDiff / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    const days = Math.floor(secondsDiff / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
