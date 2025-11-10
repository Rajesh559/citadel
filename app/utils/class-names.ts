import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges multiple class names into a single string.
 *
 * @param {...ClassValue} inputs -  string | number | bigint | boolean | ClassArray | ClassDictionary | null | undefined - Class names to merge.
 * @returns {string} Merged class names.
 */
export const mergeClasses = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
