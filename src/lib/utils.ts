import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const jsonParser = (data: string) => {
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return null;
    }
};
