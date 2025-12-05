// @ts-nocheck
import * as __fd_glob_18 from "../content/docs/getting-started/installation.mdx?collection=docs"
import * as __fd_glob_17 from "../content/docs/getting-started/index.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/getting-started/basic-setup.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/features/layouts.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/features/ipc.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/features/integrations.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/features/index.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/features/animations.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/configuration/window-management.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/configuration/input-devices.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/configuration/index.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/configuration/core-settings.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/configuration/appearance.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/configuration/advanced.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/index.mdx?collection=docs"
import { default as __fd_glob_3 } from "../content/docs/getting-started/meta.json?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/features/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/configuration/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "configuration/meta.json": __fd_glob_1, "features/meta.json": __fd_glob_2, "getting-started/meta.json": __fd_glob_3, }, {"index.mdx": __fd_glob_4, "configuration/advanced.mdx": __fd_glob_5, "configuration/appearance.mdx": __fd_glob_6, "configuration/core-settings.mdx": __fd_glob_7, "configuration/index.mdx": __fd_glob_8, "configuration/input-devices.mdx": __fd_glob_9, "configuration/window-management.mdx": __fd_glob_10, "features/animations.mdx": __fd_glob_11, "features/index.mdx": __fd_glob_12, "features/integrations.mdx": __fd_glob_13, "features/ipc.mdx": __fd_glob_14, "features/layouts.mdx": __fd_glob_15, "getting-started/basic-setup.mdx": __fd_glob_16, "getting-started/index.mdx": __fd_glob_17, "getting-started/installation.mdx": __fd_glob_18, });