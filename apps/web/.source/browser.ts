// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "configuration/advanced.mdx": () => import("../content/docs/configuration/advanced.mdx?collection=docs"), "configuration/appearance.mdx": () => import("../content/docs/configuration/appearance.mdx?collection=docs"), "configuration/core-settings.mdx": () => import("../content/docs/configuration/core-settings.mdx?collection=docs"), "configuration/index.mdx": () => import("../content/docs/configuration/index.mdx?collection=docs"), "configuration/input-devices.mdx": () => import("../content/docs/configuration/input-devices.mdx?collection=docs"), "configuration/window-management.mdx": () => import("../content/docs/configuration/window-management.mdx?collection=docs"), "features/animations.mdx": () => import("../content/docs/features/animations.mdx?collection=docs"), "features/index.mdx": () => import("../content/docs/features/index.mdx?collection=docs"), "features/integrations.mdx": () => import("../content/docs/features/integrations.mdx?collection=docs"), "features/ipc.mdx": () => import("../content/docs/features/ipc.mdx?collection=docs"), "features/layouts.mdx": () => import("../content/docs/features/layouts.mdx?collection=docs"), "getting-started/basic-setup.mdx": () => import("../content/docs/getting-started/basic-setup.mdx?collection=docs"), "getting-started/index.mdx": () => import("../content/docs/getting-started/index.mdx?collection=docs"), "getting-started/installation.mdx": () => import("../content/docs/getting-started/installation.mdx?collection=docs"), }),
};
export default browserCollections;