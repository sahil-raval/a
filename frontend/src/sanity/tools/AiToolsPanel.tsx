"use client";

import React, { useState, useCallback } from "react";
import {
  Card,
  Stack,
  Flex,
  Box,
  Button,
  TextInput,
  TextArea,
  Select,
  Spinner,
  Text,
  Heading,
  Badge,
  Tab,
  TabList,
  useToast,
} from "@sanity/ui";
import { useClient } from "sanity";
import {
  Sparkles,
  PenLine,
  Search,
  ImageIcon,
  Wand2,
  Copy,
  FilePlus2,
  Download,
  UploadCloud,
} from "lucide-react";

const API = "/api";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 96);
}

function key(): string {
  return Math.random().toString(36).slice(2, 12);
}

// Minimal Markdown -> Sanity Portable Text converter (headings, lists, paragraphs).
function markdownToBlocks(md: string): any[] {
  const lines = (md || "").replace(/\r\n/g, "\n").split("\n");
  const blocks: any[] = [];
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      blocks.push({
        _type: "block",
        _key: key(),
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", _key: key(), text: para.join(" ").trim(), marks: [] }],
      });
      para = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushPara();
      continue;
    }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      flushPara();
      const level = h[1].length;
      const style = level <= 1 ? "h2" : level === 2 ? "h2" : level === 3 ? "h3" : "h4";
      blocks.push({
        _type: "block",
        _key: key(),
        style,
        markDefs: [],
        children: [{ _type: "span", _key: key(), text: h[2].trim(), marks: [] }],
      });
      continue;
    }
    const li = line.match(/^\s*[-*]\s+(.*)$/);
    if (li) {
      flushPara();
      blocks.push({
        _type: "block",
        _key: key(),
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs: [],
        children: [{ _type: "span", _key: key(), text: li[1].trim(), marks: [] }],
      });
      continue;
    }
    const num = line.match(/^\s*\d+\.\s+(.*)$/);
    if (num) {
      flushPara();
      blocks.push({
        _type: "block",
        _key: key(),
        style: "normal",
        listItem: "number",
        level: 1,
        markDefs: [],
        children: [{ _type: "span", _key: key(), text: num[1].trim(), marks: [] }],
      });
      continue;
    }
    para.push(line.trim());
  }
  flushPara();
  return blocks;
}

async function postJSON(path: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || `Request failed (${res.status})`);
  }
  return res.json();
}

export default function AiToolsPanel() {
  const [active, setActive] = useState<"blog" | "seo" | "image" | "rewrite">("blog");
  const client = useClient({ apiVersion: "2024-10-01" });
  const toast = useToast();

  const copy = useCallback(
    (text: string) => {
      navigator.clipboard?.writeText(text);
      toast.push({ status: "success", title: "Copied to clipboard" });
    },
    [toast],
  );

  return (
    <Box padding={4} style={{ maxWidth: 900, margin: "0 auto" }}>
      <Flex align="center" gap={3} paddingBottom={4}>
        <Sparkles size={26} color="#2563eb" />
        <Stack space={2}>
          <Heading size={3}>AI Studio Tools</Heading>
          <Text size={1} muted>
            Generate blog posts, SEO metadata and images — then push them straight into your CMS.
          </Text>
        </Stack>
      </Flex>

      <TabList space={2} style={{ marginBottom: 20 }}>
        <Tab aria-controls="p-blog" id="t-blog" label="Blog Writer" icon={() => <PenLine size={15} />} selected={active === "blog"} onClick={() => setActive("blog")} />
        <Tab aria-controls="p-seo" id="t-seo" label="SEO Assistant" icon={() => <Search size={15} />} selected={active === "seo"} onClick={() => setActive("seo")} />
        <Tab aria-controls="p-image" id="t-image" label="Image Generator" icon={() => <ImageIcon size={15} />} selected={active === "image"} onClick={() => setActive("image")} />
        <Tab aria-controls="p-rewrite" id="t-rewrite" label="Rewrite" icon={() => <Wand2 size={15} />} selected={active === "rewrite"} onClick={() => setActive("rewrite")} />
      </TabList>

      {active === "blog" && <BlogWriter client={client} toast={toast} />}
      {active === "seo" && <SeoAssistant copy={copy} />}
      {active === "image" && <ImageGenerator client={client} toast={toast} />}
      {active === "rewrite" && <Rewriter copy={copy} />}
    </Box>
  );
}

/* --------------------------------- Blog --------------------------------- */
function BlogWriter({ client, toast }: { client: any; toast: any }) {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<any>(null);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await postJSON("/ai/blog", { topic, tone, keywords });
      setResult(data);
    } catch (e: any) {
      toast.push({ status: "error", title: "Generation failed", description: String(e.message || e) });
    } finally {
      setLoading(false);
    }
  };

  const createDraft = async () => {
    if (!result) return;
    setSaving(true);
    try {
      const doc = {
        _type: "blogPost",
        _id: `drafts.${key()}${key()}`,
        title: result.title,
        slug: { _type: "slug", current: slugify(result.title || topic) },
        excerpt: result.excerpt,
        author: "APM Energy",
        publishedAt: new Date().toISOString(),
        category: result.category || "Solar",
        tags: Array.isArray(result.tags) ? result.tags : [],
        body: markdownToBlocks(result.bodyMarkdown || ""),
        seo: {
          title: result.metaTitle,
          description: result.metaDescription,
          keywords: Array.isArray(result.keywords) ? result.keywords : [],
        },
      };
      await client.create(doc);
      toast.push({
        status: "success",
        title: "Draft created — SEO auto-filled",
        description: 'Meta title, description, keywords & category were applied. Open "Blog Posts" to review & publish.',
      });
    } catch (e: any) {
      toast.push({ status: "error", title: "Could not create draft", description: String(e.message || e) });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Stack space={4}>
      <Card padding={4} radius={3} shadow={1}>
        <Stack space={4}>
          <Stack space={2}>
            <Text size={1} weight="semibold">Blog topic</Text>
            <TextInput placeholder="e.g. How home batteries cut your power bill" value={topic} onChange={(e) => setTopic(e.currentTarget.value)} />
          </Stack>
          <Flex gap={3}>
            <Stack space={2} flex={1}>
              <Text size={1} weight="semibold">Tone</Text>
              <Select value={tone} onChange={(e) => setTone(e.currentTarget.value)}>
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="authoritative">Authoritative</option>
                <option value="conversational">Conversational</option>
                <option value="persuasive">Persuasive</option>
              </Select>
            </Stack>
            <Stack space={2} flex={2}>
              <Text size={1} weight="semibold">Target keywords (optional)</Text>
              <TextInput placeholder="solar battery, energy savings" value={keywords} onChange={(e) => setKeywords(e.currentTarget.value)} />
            </Stack>
          </Flex>
          <Flex>
            <Button
              text={loading ? "Writing…" : "Generate Blog Post"}
              tone="primary"
              icon={loading ? Spinner : () => <Sparkles size={16} />}
              disabled={loading || !topic.trim()}
              onClick={generate}
            />
          </Flex>
        </Stack>
      </Card>

      {result && (
        <Card padding={4} radius={3} shadow={1}>
          <Stack space={4}>
            <Heading size={2}>{result.title}</Heading>
            <Text size={1} muted>{result.excerpt}</Text>
            <Flex gap={2} wrap="wrap">
              {(result.tags || []).map((t: string) => (
                <Badge key={t} tone="primary">{t}</Badge>
              ))}
            </Flex>
            <Card padding={3} radius={2} tone="transparent" border>
              <Box style={{ maxHeight: 320, overflow: "auto", whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
                <Text size={1}>{result.bodyMarkdown}</Text>
              </Box>
            </Card>
            <Card padding={3} radius={2} tone="primary">
              <Stack space={2}>
                <Text size={1} weight="semibold">SEO Meta Title</Text>
                <Text size={1}>{result.metaTitle}</Text>
                <Text size={1} weight="semibold">SEO Meta Description</Text>
                <Text size={1}>{result.metaDescription}</Text>
              </Stack>
            </Card>
            <Flex gap={3}>
              <Button
                text={saving ? "Creating…" : "Create Blog Draft"}
                tone="positive"
                icon={saving ? Spinner : () => <FilePlus2 size={16} />}
                disabled={saving}
                onClick={createDraft}
              />
            </Flex>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}

/* ---------------------------------- SEO --------------------------------- */
function SeoAssistant({ copy }: { copy: (t: string) => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const toast = useToast();

  const generate = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      setResult(await postJSON("/ai/seo", { title, content }));
    } catch (e: any) {
      toast.push({ status: "error", title: "Generation failed", description: String(e.message || e) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack space={4}>
      <Card padding={4} radius={3} shadow={1}>
        <Stack space={4}>
          <Stack space={2}>
            <Text size={1} weight="semibold">Page / post title (optional)</Text>
            <TextInput value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
          </Stack>
          <Stack space={2}>
            <Text size={1} weight="semibold">Content or topic</Text>
            <TextArea rows={6} placeholder="Paste your page content or describe the topic…" value={content} onChange={(e) => setContent(e.currentTarget.value)} />
          </Stack>
          <Flex>
            <Button text={loading ? "Analysing…" : "Generate SEO Metadata"} tone="primary" icon={loading ? Spinner : () => <Search size={16} />} disabled={loading || !content.trim()} onClick={generate} />
          </Flex>
        </Stack>
      </Card>

      {result && (
        <Card padding={4} radius={3} shadow={1}>
          <Stack space={4}>
            <Stack space={2}>
              <Flex align="center" justify="space-between">
                <Text size={1} weight="semibold">Meta Title ({(result.metaTitle || "").length} chars)</Text>
                <Button mode="bleed" icon={() => <Copy size={14} />} text="Copy" onClick={() => copy(result.metaTitle)} />
              </Flex>
              <Card padding={3} radius={2} tone="transparent" border><Text size={1}>{result.metaTitle}</Text></Card>
            </Stack>
            <Stack space={2}>
              <Flex align="center" justify="space-between">
                <Text size={1} weight="semibold">Meta Description ({(result.metaDescription || "").length} chars)</Text>
                <Button mode="bleed" icon={() => <Copy size={14} />} text="Copy" onClick={() => copy(result.metaDescription)} />
              </Flex>
              <Card padding={3} radius={2} tone="transparent" border><Text size={1}>{result.metaDescription}</Text></Card>
            </Stack>
            <Stack space={2}>
              <Text size={1} weight="semibold">Keywords</Text>
              <Flex gap={2} wrap="wrap">
                {(result.keywords || []).map((k: string) => <Badge key={k} tone="primary">{k}</Badge>)}
              </Flex>
              <Box><Button mode="ghost" icon={() => <Copy size={14} />} text="Copy keywords" onClick={() => copy((result.keywords || []).join(", "))} /></Box>
            </Stack>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}

/* --------------------------------- Image -------------------------------- */
function ImageGenerator({ client, toast }: { client: any; toast: any }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setDataUrl(null);
    try {
      const data = await postJSON("/ai/image", { prompt });
      setDataUrl(`data:${data.mime_type};base64,${data.data}`);
    } catch (e: any) {
      toast.push({ status: "error", title: "Generation failed", description: String(e.message || e) });
    } finally {
      setLoading(false);
    }
  };

  const upload = async () => {
    if (!dataUrl) return;
    setUploading(true);
    try {
      const blob = await (await fetch(dataUrl)).blob();
      const asset = await client.assets.upload("image", blob, { filename: `ai-image-${Date.now()}.png` });
      toast.push({ status: "success", title: "Uploaded to Media", description: `Asset ${asset._id} is now available in the image pickers.` });
    } catch (e: any) {
      toast.push({ status: "error", title: "Upload failed", description: String(e.message || e) });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Stack space={4}>
      <Card padding={4} radius={3} shadow={1}>
        <Stack space={4}>
          <Stack space={2}>
            <Text size={1} weight="semibold">Describe the image</Text>
            <TextArea rows={3} placeholder="e.g. Modern home with rooftop solar panels at golden hour, photorealistic" value={prompt} onChange={(e) => setPrompt(e.currentTarget.value)} />
          </Stack>
          <Flex>
            <Button text={loading ? "Generating…" : "Generate Image"} tone="primary" icon={loading ? Spinner : () => <ImageIcon size={16} />} disabled={loading || !prompt.trim()} onClick={generate} />
          </Flex>
        </Stack>
      </Card>

      {dataUrl && (
        <Card padding={4} radius={3} shadow={1}>
          <Stack space={4}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dataUrl} alt="AI generated" style={{ width: "100%", borderRadius: 12, display: "block" }} />
            <Flex gap={3}>
              <Button text={uploading ? "Uploading…" : "Upload to Media Library"} tone="positive" icon={uploading ? Spinner : () => <UploadCloud size={16} />} disabled={uploading} onClick={upload} />
              <a href={dataUrl} download={`ai-image-${Date.now()}.png`} style={{ textDecoration: "none" }}>
                <Button mode="ghost" text="Download" icon={() => <Download size={16} />} />
              </a>
            </Flex>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}

/* -------------------------------- Rewrite ------------------------------- */
function Rewriter({ copy }: { copy: (t: string) => void }) {
  const [text, setText] = useState("");
  const [instruction, setInstruction] = useState("Improve clarity, grammar and flow");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const toast = useToast();

  const run = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const data = await postJSON("/ai/improve", { text, instruction });
      setResult(data.result);
    } catch (e: any) {
      toast.push({ status: "error", title: "Rewrite failed", description: String(e.message || e) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack space={4}>
      <Card padding={4} radius={3} shadow={1}>
        <Stack space={4}>
          <Stack space={2}>
            <Text size={1} weight="semibold">Instruction</Text>
            <TextInput value={instruction} onChange={(e) => setInstruction(e.currentTarget.value)} />
          </Stack>
          <Stack space={2}>
            <Text size={1} weight="semibold">Text to rewrite</Text>
            <TextArea rows={6} value={text} onChange={(e) => setText(e.currentTarget.value)} />
          </Stack>
          <Flex>
            <Button text={loading ? "Rewriting…" : "Rewrite"} tone="primary" icon={loading ? Spinner : () => <Wand2 size={16} />} disabled={loading || !text.trim()} onClick={run} />
          </Flex>
        </Stack>
      </Card>
      {result && (
        <Card padding={4} radius={3} shadow={1}>
          <Stack space={3}>
            <Flex align="center" justify="space-between">
              <Text size={1} weight="semibold">Result</Text>
              <Button mode="bleed" icon={() => <Copy size={14} />} text="Copy" onClick={() => copy(result)} />
            </Flex>
            <Card padding={3} radius={2} tone="transparent" border>
              <Box style={{ whiteSpace: "pre-wrap" }}><Text size={1}>{result}</Text></Box>
            </Card>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
