import type { TaskKey } from "@/lib/site-config";

export const slot4TaskSupport = {
  article: false,
  classified: true,
  sbm: false,
  profile: false,
  pdf: false,
  listing: false,
  image: false,
} satisfies Record<TaskKey, boolean>;

export const slot4TaskNotes = {
  article: "Axidra article pages and article detail backlinks",
  classified: "Axidra classified ads pages and detail backlinks",
  sbm: "Axidra social bookmarking pages and detail backlinks",
  profile: "Axidra profile/user pages",
  pdf: "Axidra PDF/document pages and detail backlinks",
  listing: "Axidra business listing pages and detail backlinks",
  image: "Axidra image/gallery pages and detail backlinks",
} satisfies Record<TaskKey, string>;
