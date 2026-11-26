// Sanity connection settings, read from environment variables.
// Locally they live in .env.local (never committed). On Netlify they are set in
// Site configuration -> Environment variables.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-11-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Set in .env.local (local) and Netlify environment variables.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const isSanityConfigured = projectId.length > 0;
