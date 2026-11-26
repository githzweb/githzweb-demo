// Sanity Studio: the editing screen, at /studio. Editors log in with their Sanity account.
// Built as one static page; public/_redirects sends every /studio/... address to it.

import { NextStudio } from "next-sanity/studio";

import config from "../../../sanity.config";

export { metadata, viewport } from "next-sanity/studio";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  return <NextStudio config={config} />;
}
