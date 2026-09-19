"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import React from "react";
import { Sparkles } from "lucide-react";
import { schemaTypes, singletonTypes } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import AiToolsPanel from "./src/sanity/tools/AiToolsPanel";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "APM Energy CMS",
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
  apiVersion,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  tools: (prev) => [
  ...prev,
  { name: "ai-tools", title: "AI Tools", icon: () => React.createElement(Sparkles, { size: 18 }), component: AiToolsPanel },
],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
