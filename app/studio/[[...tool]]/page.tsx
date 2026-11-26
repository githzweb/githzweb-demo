// Sanity Studio: the editing screen, at /studio. Editors log in with their Sanity account.

import { NextStudio } from "next-sanity/studio";

import config from "../../../sanity.config";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
