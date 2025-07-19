// This file defines a utility function to help manage CSS class names easily.

// Import the "clsx" library, which helps combine class names conditionally.
import { clsx } from 'clsx'

// Import the "twMerge" function from "tailwind-merge", which merges Tailwind CSS classes and removes duplicates.
import { twMerge } from 'tailwind-merge'

// Define and export the "cn" function.
// This function takes any number of arguments (...inputs), combines them with "clsx",
// and then merges them with "twMerge" to ensure Tailwind classes are handled correctly.
export const cn = (...inputs) => {
    return twMerge(clsx(inputs))
};