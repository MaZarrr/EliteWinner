import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formattedDateFn(dateString: string) {
  let date = new Date(dateString);
  let year = date.getUTCFullYear();
  let month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  let day = ("0" + date.getUTCDate()).slice(-2);
  let hours = ("0" + date.getUTCHours()).slice(-2);
  let minutes = ("0" + date.getUTCMinutes()).slice(-2);
  let seconds = ("0" + date.getUTCSeconds()).slice(-2);
  return day + "." + month + "." + year + " " + hours + ":" + minutes + ":" + seconds;
}
