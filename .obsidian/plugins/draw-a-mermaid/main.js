var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MermaidVisualPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// src/icon.ts
var MERMAID_ICON_SVG = '<path d="M9.21191 38.846C11.3475 42.5571 15.0256 47.0038 20.8291 51.0296C36.7741 62.0909 40.4112 79.0325 43.707 91.0003H9V38.8889C9.02393 38.8797 9.0504 38.8686 9.08008 38.8616C9.12541 38.851 9.16969 38.8465 9.20801 38.846C9.20933 38.846 9.21063 38.846 9.21191 38.846ZM90.792 38.846C90.8303 38.8465 90.8746 38.851 90.9199 38.8616C90.9496 38.8686 90.9761 38.8797 91 38.8889V91.0003H56.293C59.5888 79.0325 63.2259 62.0909 79.1709 51.0296C84.9741 47.0039 88.6515 42.557 90.7871 38.846C90.7887 38.846 90.7903 38.846 90.792 38.846ZM77.8379 9.03055C82.1567 8.89873 86.5017 9.21848 90.9961 9.26492C90.9092 21.6012 89.1935 29.0284 86.5352 34.1751C83.8639 39.3468 80.1953 42.3188 75.9297 45.719C71.6639 49.1194 66.8667 52.9035 62.2695 59.6526C57.7698 66.2588 53.4952 75.6538 50 90.2532C46.5048 75.6538 42.2302 66.2588 37.7305 59.6526C33.1333 52.9035 28.3361 49.1194 24.0703 45.719C19.8047 42.3188 16.1361 39.3468 13.4648 34.1751C10.8068 29.0288 9.0901 21.6024 9.00293 9.26785C13.4355 9.23781 17.8254 9.03917 22.0889 9.31277C26.4398 9.59202 30.5322 10.3632 34.1641 12.2659C41.3406 16.0259 47.1022 24.4257 48.9873 43.5471C49.0379 44.0602 49.4698 44.4511 49.9854 44.4495C50.5009 44.4478 50.9303 44.0537 50.9775 43.5403C52.8241 23.4608 58.591 15.0846 65.7451 11.5569C69.3722 9.76854 73.4672 9.16397 77.8379 9.03055Z" fill="currentColor"/>';

// src/main.ts
var MERMAID_ICON_ID = "draw-a-mermaid";
var SHAPE_OPEN = {
  rect: "[",
  round: "(",
  diamond: "{",
  circle: "(("
};
var SHAPE_CLOSE = {
  rect: "]",
  round: ")",
  diamond: "}",
  circle: "))"
};
var MermaidVisualPlugin = class extends import_obsidian.Plugin {
  async onload() {
    (0, import_obsidian.addIcon)(MERMAID_ICON_ID, MERMAID_ICON_SVG);
    this.registerMarkdownPostProcessor(
      (el, ctx) => this.decorateMermaidBlocks(el, ctx)
    );
    this.addRibbonIcon(
      MERMAID_ICON_ID,
      "Draw a Mermaid",
      () => this.openBlankEditor()
    );
    this.addCommand({
      id: "edit-mermaid-at-cursor",
      name: "Edit mermaid diagram at cursor",
      editorCheckCallback: (checking, editor, view) => {
        const block = findFenceAroundLine(
          editor.getValue(),
          editor.getCursor().line
        );
        if (!block) return false;
        if (checking) return true;
        new VisualEditorModal(this.app, block.code, async (next) => {
          editor.replaceRange(
            next,
            { line: block.innerStart, ch: 0 },
            {
              line: block.innerEnd,
              ch: editor.getLine(block.innerEnd).length
            }
          );
        }).open();
        return true;
      }
    });
    this.addCommand({
      id: "insert-mermaid",
      name: "Insert mermaid diagram (visual editor)",
      editorCallback: (editor) => {
        new VisualEditorModal(this.app, "", async (next) => {
          editor.replaceSelection("```mermaid\n" + next + "\n```\n");
        }).open();
      }
    });
  }
  /** Open a blank visual editor; on save, drop the diagram into the active
   *  note at the cursor, or create a new note if none is open. */
  openBlankEditor() {
    new VisualEditorModal(this.app, "", async (next) => {
      const block = "```mermaid\n" + next + "\n```\n";
      const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
      if (view?.editor) {
        view.editor.replaceSelection(block);
      } else {
        const stamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace("T", " ").replace(/:/g, "");
        const file = await this.app.vault.create(
          `Mermaid diagram ${stamp}.md`,
          block
        );
        await this.app.workspace.getLeaf(true).openFile(file);
      }
    }).open();
  }
  decorateMermaidBlocks(el, ctx) {
    const blocks = el.querySelectorAll(
      ".mermaid, pre.mermaid, code.language-mermaid"
    );
    blocks.forEach((blockEl) => {
      const container = blockEl.closest(".el-pre, .markdown-rendered > *") || blockEl.parentElement || blockEl;
      if (container.dataset.mvDecorated === "1") return;
      container.dataset.mvDecorated = "1";
      container.classList.add("mv-block");
      const btn = container.createDiv({ cls: "mv-edit-btn" });
      (0, import_obsidian.setIcon)(btn, "pencil");
      btn.setAttr("aria-label", "Edit diagram visually");
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        void this.openForRenderedBlock(container, ctx);
      });
    });
  }
  async openForRenderedBlock(container, ctx) {
    const section = ctx.getSectionInfo(container);
    const file = this.app.vault.getAbstractFileByPath(ctx.sourcePath);
    if (!section || !(file instanceof import_obsidian.TFile)) {
      new import_obsidian.Notice("Mermaid Visual: couldn't locate the source block.");
      return;
    }
    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const block = parseFence(lines, section.lineStart, section.lineEnd);
    if (!block) {
      new import_obsidian.Notice("Mermaid Visual: couldn't parse the mermaid block.");
      return;
    }
    new VisualEditorModal(this.app, block.code, async (next) => {
      const updated = [...lines];
      updated.splice(
        block.innerStart,
        block.innerEnd - block.innerStart + 1,
        ...next.split("\n")
      );
      await this.app.vault.modify(file, updated.join("\n"));
    }).open();
  }
};
function parseFence(lines, lineStart, lineEnd) {
  let open = -1;
  for (let i = lineStart; i <= lineEnd && i < lines.length; i++) {
    if (/^\s*(```|~~~)\s*mermaid\s*$/i.test(lines[i])) {
      open = i;
      break;
    }
  }
  if (open === -1) return null;
  let close = -1;
  for (let i = open + 1; i <= lineEnd + 1 && i < lines.length; i++) {
    if (/^\s*(```|~~~)\s*$/.test(lines[i])) {
      close = i;
      break;
    }
  }
  if (close === -1) return null;
  const innerStart = open + 1;
  const innerEnd = close - 1;
  if (innerEnd < innerStart)
    return { code: "", innerStart, innerEnd: innerStart - 1 };
  return {
    code: lines.slice(innerStart, innerEnd + 1).join("\n"),
    innerStart,
    innerEnd
  };
}
function findFenceAroundLine(text, cursorLine) {
  const lines = text.split("\n");
  let open = -1;
  for (let i = cursorLine; i >= 0; i--) {
    if (/^\s*(```|~~~)\s*$/.test(lines[i]) && i !== cursorLine) return null;
    if (/^\s*(```|~~~)\s*mermaid\s*$/i.test(lines[i])) {
      open = i;
      break;
    }
  }
  if (open === -1) return null;
  let close = -1;
  for (let i = open + 1; i < lines.length; i++) {
    if (/^\s*(```|~~~)\s*$/.test(lines[i])) {
      close = i;
      break;
    }
  }
  if (close === -1 || cursorLine >= close) return null;
  const innerStart = open + 1;
  const innerEnd = close - 1;
  return {
    code: innerEnd >= innerStart ? lines.slice(innerStart, innerEnd + 1).join("\n") : "",
    innerStart,
    innerEnd: Math.max(innerEnd, innerStart)
  };
}
function generateMermaid(g) {
  const lines = [`flowchart ${g.dir}`];
  for (const n of g.nodes) {
    const open = SHAPE_OPEN[n.shape];
    const close = SHAPE_CLOSE[n.shape];
    lines.push(`    ${n.id}${open}"${escapeLabel(n.label)}"${close}`);
  }
  for (const e of g.edges) {
    const lbl = e.label.trim() ? `-->|"${escapeLabel(e.label)}"|` : `-->`;
    lines.push(`    ${e.from} ${lbl} ${e.to}`);
  }
  const layout = {};
  for (const n of g.nodes) layout[n.id] = [Math.round(n.x), Math.round(n.y)];
  lines.push(`    %% mv:${JSON.stringify(layout)}`);
  return lines.join("\n");
}
function escapeLabel(s) {
  return s.replace(/"/g, "&quot;");
}
function unescapeLabel(s) {
  return s.replace(/&quot;/g, '"');
}
function parseMermaid(code) {
  const g = { dir: "TD", nodes: [], edges: [] };
  const nodeMap = /* @__PURE__ */ new Map();
  let edgeSeq = 0;
  let layout = {};
  let sawAny = false;
  const ensure = (id) => {
    let n = nodeMap.get(id);
    if (!n) {
      n = { id, label: id, shape: "rect", x: 0, y: 0 };
      nodeMap.set(id, n);
      g.nodes.push(n);
    }
    return n;
  };
  const nodeDef = (raw) => {
    const m = raw.match(
      /^([A-Za-z0-9_]+)\s*(\(\(|\[|\(|\{)\s*"?(.*?)"?\s*(\)\)|\]|\)|\})\s*$/
    );
    if (!m) return null;
    const [, id, open, label] = m;
    const shape = open === "[" ? "rect" : open === "(" ? "round" : open === "((" ? "circle" : "diamond";
    const n = ensure(id);
    n.shape = shape;
    n.label = unescapeLabel(label);
    return n;
  };
  for (const rawLine of code.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;
    const layoutMatch = line.match(/^%%\s*mv:(\{.*\})\s*$/);
    if (layoutMatch) {
      try {
        layout = JSON.parse(layoutMatch[1]);
      } catch {
      }
      continue;
    }
    if (line.startsWith("%%")) continue;
    const header = line.match(/^(?:flowchart|graph)\s+(TD|TB|LR|RL|BT)\b/i);
    if (header) {
      const d = header[1].toUpperCase();
      g.dir = d === "LR" || d === "RL" ? "LR" : "TD";
      sawAny = true;
      continue;
    }
    const edge = line.match(
      /^(.+?)\s*--+>?\s*(?:\|\s*"?(.*?)"?\s*\|\s*)?(.+?)\s*$/
    );
    const isEdge = /--+>/.test(line);
    if (isEdge && edge) {
      const fromRaw = edge[1].trim();
      const label = edge[2] ?? "";
      const toRaw = edge[3].trim();
      const from = nodeDef(fromRaw) ?? ensure(idOnly(fromRaw));
      const to = nodeDef(toRaw) ?? ensure(idOnly(toRaw));
      g.edges.push({
        id: `e${edgeSeq++}`,
        from: from.id,
        to: to.id,
        label: unescapeLabel(label)
      });
      sawAny = true;
      continue;
    }
    const nd = nodeDef(line);
    if (nd) {
      sawAny = true;
      continue;
    }
    if (/^[A-Za-z0-9_]+$/.test(line)) {
      ensure(line);
      sawAny = true;
    }
  }
  if (!sawAny || g.nodes.length === 0) return null;
  let auto = 0;
  for (const n of g.nodes) {
    const p = layout[n.id];
    if (p && Array.isArray(p)) {
      n.x = p[0];
      n.y = p[1];
    } else {
      n.x = 80 + auto % 3 * 200;
      n.y = 80 + Math.floor(auto / 3) * 130;
      auto++;
    }
  }
  return g;
}
function idOnly(raw) {
  const m = raw.match(/^([A-Za-z0-9_]+)/);
  return m ? m[1] : raw.replace(/[^A-Za-z0-9_]/g, "") || "n";
}
function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len2 = dx * dx + dy * dy;
  let t = len2 === 0 ? 0 : ((px - x1) * dx + (py - y1) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const cx = x1 + t * dx;
  const cy = y1 + t * dy;
  return Math.hypot(px - cx, py - cy);
}
var EdgeLabelModal = class extends import_obsidian.Modal {
  constructor(app, value, onSubmit) {
    super(app);
    this.value = value;
    this.onSubmit = onSubmit;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h3", { text: "Connector label" });
    const input = contentEl.createEl("input", {
      type: "text",
      cls: "mv-label-input",
      value: this.value
    });
    input.placeholder = "(leave blank for no label)";
    const commit = () => {
      this.onSubmit(input.value);
      this.close();
    };
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        commit();
      } else if (e.key === "Escape") {
        this.close();
      }
    });
    const footer = contentEl.createDiv({ cls: "mv-footer" });
    const ok = footer.createEl("button", { text: "OK", cls: "mod-cta" });
    ok.addEventListener("click", commit);
    const cancel = footer.createEl("button", { text: "Cancel" });
    cancel.addEventListener("click", () => this.close());
    input.focus();
    input.select();
  }
  onClose() {
    this.contentEl.empty();
  }
};
var VisualEditorModal = class extends import_obsidian.Modal {
  constructor(app, code, onSave) {
    super(app);
    this.idSeq = 1;
    this.selectedNodes = /* @__PURE__ */ new Set();
    this.selectedEdge = null;
    this.hoverEdge = null;
    this.renderSeq = 0;
    this.renderTimer = null;
    this.shapeButtons = /* @__PURE__ */ new Map();
    this.drag = null;
    this.onSave = onSave;
    this.renderComp = new import_obsidian.Component();
    const parsed = code.trim() ? parseMermaid(code) : null;
    this.g = parsed ?? { dir: "TD", nodes: [], edges: [] };
    for (const n of this.g.nodes) {
      const m = n.id.match(/^n(\d+)$/);
      if (m) this.idSeq = Math.max(this.idSeq, Number(m[1]) + 1);
    }
    if (!parsed && code.trim()) {
      new import_obsidian.Notice(
        "Mermaid Visual: couldn't parse this diagram into blocks; starting a fresh canvas."
      );
    }
  }
  onOpen() {
    this.modalEl.addClass("mv-modal");
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("mv-modal-content");
    this.buildToolbar(contentEl);
    const body = contentEl.createDiv({ cls: "mv-body" });
    const canvasWrap = body.createDiv({ cls: "mv-canvas-wrap" });
    this.canvasEl = canvasWrap.createDiv({ cls: "mv-canvas" });
    this.edgesSvg = this.canvasEl.createSvg("svg", {
      cls: "mv-edges"
    });
    const defs = this.edgesSvg.createSvg("defs");
    const marker = defs.createSvg("marker", {
      attr: {
        id: "mv-arrow",
        viewBox: "0 0 10 10",
        refX: "9",
        refY: "5",
        markerWidth: "7",
        markerHeight: "7",
        orient: "auto-start-reverse"
      }
    });
    marker.createSvg("path", {
      attr: { d: "M 0 0 L 10 5 L 0 10 z", fill: "var(--text-muted)" }
    });
    this.nodesLayer = this.canvasEl.createDiv({ cls: "mv-nodes" });
    this.canvasEl.addEventListener("pointerdown", (e) => {
      if (e.target !== this.canvasEl && e.target !== this.nodesLayer) return;
      const rect = this.canvasEl.getBoundingClientRect();
      const sx = e.clientX - rect.left + this.canvasEl.scrollLeft;
      const sy = e.clientY - rect.top + this.canvasEl.scrollTop;
      const base = e.shiftKey ? new Set(this.selectedNodes) : /* @__PURE__ */ new Set();
      if (!e.shiftKey) this.select(null, null);
      const marquee = this.canvasEl.createDiv({ cls: "mv-marquee" });
      marquee.style.left = `${sx}px`;
      marquee.style.top = `${sy}px`;
      this.drag = { kind: "marquee", el: marquee, sx, sy, base };
      this.canvasEl.setPointerCapture(e.pointerId);
    });
    this.canvasEl.addEventListener("pointermove", (e) => this.onPointerMove(e));
    this.canvasEl.addEventListener("pointerup", (e) => this.onPointerUp(e));
    const out = body.createDiv({ cls: "mv-out" });
    const pTop = out.createDiv({ cls: "mv-out-section" });
    pTop.createDiv({ cls: "mv-pane-label", text: "Rendered" });
    this.previewEl = pTop.createDiv({ cls: "mv-preview" });
    const pBot = out.createDiv({ cls: "mv-out-section" });
    pBot.createDiv({ cls: "mv-pane-label", text: "Mermaid code" });
    this.codeEl = pBot.createEl("pre", { cls: "mv-code" });
    this.buildFooter(contentEl);
    this.renderComp.load();
    this.rebuildNodes();
    this.refresh();
    const onDelete = () => {
      if (this.isEditingLabel()) return;
      this.deleteSelection();
      return false;
    };
    this.scope.register([], "Delete", onDelete);
    this.scope.register([], "Backspace", onDelete);
  }
  isEditingLabel() {
    return !!this.contentEl.querySelector(".mv-node-label.is-editing");
  }
  buildToolbar(parent) {
    const bar = parent.createDiv({ cls: "mv-toolbar" });
    const shapes = [
      { s: "rect", name: "Rectangle" },
      { s: "round", name: "Rounded" },
      { s: "diamond", name: "Diamond (decision)" },
      { s: "circle", name: "Circle" }
    ];
    const shapeGroup = bar.createDiv({ cls: "mv-segmented" });
    for (const { s, name } of shapes) {
      const b = shapeGroup.createEl("button", { cls: "mv-seg mv-seg-shape" });
      this.addShapeGlyph(b, s);
      b.setAttr("aria-label", name);
      b.setAttr("title", `${name} \u2014 click to add, or reshape selected block(s)`);
      this.shapeButtons.set(s, b);
      b.addEventListener("click", () => {
        if (this.selectedNodes.size) {
          for (const id of this.selectedNodes) {
            const n = this.node(id);
            if (n) {
              n.shape = s;
              this.applyShape(n);
            }
          }
          this.updateShapeButtons();
          this.refresh();
        } else {
          this.createNodeAt(s);
        }
      });
    }
    bar.createSpan({ cls: "mv-sep" });
    const dirGroup = bar.createDiv({ cls: "mv-segmented" });
    const dirTitles = {
      TD: "Top-Down \u2014 diagram flows downward",
      LR: "Left-to-Right \u2014 diagram flows across"
    };
    ["TD", "LR"].forEach((d) => {
      const b = dirGroup.createEl("button", { cls: "mv-seg", text: d });
      b.setAttr("title", dirTitles[d]);
      if (d === this.g.dir) b.addClass("is-active");
      b.addEventListener("click", () => {
        this.g.dir = d;
        dirGroup.querySelectorAll(".mv-seg").forEach((x) => x.removeClass("is-active"));
        b.addClass("is-active");
        this.refresh();
      });
    });
    bar.createSpan({ cls: "mv-sep" });
    const del = bar.createEl("button", { cls: "mv-tool", text: "Delete" });
    del.addEventListener("click", () => this.deleteSelection());
    bar.createSpan({
      cls: "mv-hint",
      text: "Click a shape to add \xB7 drag \u25CF to connect \xB7 \u2325-drag to duplicate"
    });
  }
  buildFooter(parent) {
    const footer = parent.createDiv({ cls: "mv-footer" });
    const save = footer.createEl("button", { text: "Save", cls: "mod-cta" });
    save.addEventListener("click", () => {
      void (async () => {
        try {
          await this.onSave(generateMermaid(this.g));
          new import_obsidian.Notice("Diagram saved.");
          this.close();
        } catch (err) {
          console.error("Draw a Mermaid save failed", err);
          new import_obsidian.Notice("Draw a Mermaid: save failed (see console).");
        }
      })();
    });
    const cancel = footer.createEl("button", { text: "Cancel" });
    cancel.addEventListener("click", () => this.close());
  }
  /* ---- model helpers ---- */
  node(id) {
    return this.g.nodes.find((n) => n.id === id);
  }
  /** Create a node. With no coords it lands near the canvas centre. */
  createNodeAt(shape, x, y) {
    const id = `n${this.idSeq++}`;
    if (x === void 0 || y === void 0) {
      const rect = this.canvasEl.getBoundingClientRect();
      const offset = this.g.nodes.length % 5 * 24;
      x = this.canvasEl.scrollLeft + rect.width / 2 - 50 + offset;
      y = this.canvasEl.scrollTop + rect.height / 2 - 20 + offset;
    }
    const n = { id, label: "New block", shape, x, y };
    this.g.nodes.push(n);
    this.createNodeEl(n);
    this.select(id, null);
    this.refresh();
    window.setTimeout(() => this.beginRename(n), 0);
    return n;
  }
  /** Clone a node (same label/shape/position) as a new block, without
   *  touching selection — caller decides what ends up selected. */
  makeDuplicate(src) {
    const id = `n${this.idSeq++}`;
    const n = {
      id,
      label: src.label,
      shape: src.shape,
      x: src.x,
      y: src.y
    };
    this.g.nodes.push(n);
    this.createNodeEl(n);
    return n;
  }
  updateShapeButtons() {
    const shapes = /* @__PURE__ */ new Set();
    for (const id of this.selectedNodes) {
      const n = this.node(id);
      if (n) shapes.add(n.shape);
    }
    const common = shapes.size === 1 ? [...shapes][0] : null;
    this.shapeButtons.forEach((btn, shape) => {
      btn.toggleClass("is-active", common === shape);
    });
  }
  deleteSelection() {
    if (this.selectedNodes.size) {
      const ids = this.selectedNodes;
      this.g.nodes = this.g.nodes.filter((n) => {
        if (ids.has(n.id)) {
          n.el?.remove();
          return false;
        }
        return true;
      });
      this.g.edges = this.g.edges.filter(
        (e) => !ids.has(e.from) && !ids.has(e.to)
      );
      this.select(null, null);
      this.refresh();
    } else if (this.selectedEdge) {
      this.g.edges = this.g.edges.filter((e) => e.id !== this.selectedEdge);
      this.select(null, null);
      this.refresh();
    }
  }
  /** Select a single node (or none) plus an optional edge. */
  select(node, edge) {
    this.selectedNodes.clear();
    if (node) this.selectedNodes.add(node);
    this.selectedEdge = edge;
    this.applySelection();
  }
  /** Replace the multi-node selection (clears any edge selection). */
  setSelection(ids) {
    this.selectedNodes = new Set(ids);
    this.selectedEdge = null;
    this.applySelection();
  }
  /** Reflect the current selection state in the DOM. */
  applySelection() {
    this.nodesLayer.querySelectorAll(".mv-node").forEach(
      (el) => el.toggleClass(
        "is-selected",
        this.selectedNodes.has(el.dataset.id || "")
      )
    );
    this.updateShapeButtons();
    this.drawEdges();
  }
  /* ---- DOM: nodes ---- */
  rebuildNodes() {
    this.nodesLayer.empty();
    for (const n of this.g.nodes) this.createNodeEl(n);
  }
  createNodeEl(n) {
    const el = this.nodesLayer.createDiv({ cls: "mv-node" });
    el.dataset.id = n.id;
    n.el = el;
    const label = el.createDiv({ cls: "mv-node-label", text: n.label });
    n.labelEl = label;
    const handle = el.createDiv({ cls: "mv-handle" });
    handle.setAttr("aria-label", "Drag to connect");
    this.applyShape(n);
    this.positionNode(n);
    el.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".mv-handle")) return;
      if (label.isContentEditable) return;
      e.stopPropagation();
      if (e.shiftKey) {
        if (this.selectedNodes.has(n.id)) this.selectedNodes.delete(n.id);
        else this.selectedNodes.add(n.id);
        this.selectedEdge = null;
        this.applySelection();
        return;
      }
      if (!this.selectedNodes.has(n.id)) this.select(n.id, null);
      this.drag = {
        kind: "pending",
        id: n.id,
        dx: 0,
        dy: 0,
        sx: e.clientX,
        sy: e.clientY,
        pointerId: e.pointerId,
        alt: e.altKey
      };
    });
    el.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      this.beginRename(n);
    });
    handle.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const line = this.edgesSvg.createSvg("line", {
        cls: "mv-temp-edge",
        attr: { "marker-end": "url(#mv-arrow)" }
      });
      this.drag = { kind: "edge", from: n.id, line };
      this.canvasEl.setPointerCapture(e.pointerId);
    });
  }
  applyShape(n) {
    if (!n.el) return;
    n.el.removeClass("shape-rect", "shape-round", "shape-diamond", "shape-circle");
    n.el.addClass(`shape-${n.shape}`);
  }
  /** Draw a matching line-style glyph for a shape-picker button. */
  addShapeGlyph(btn, shape) {
    const svg = btn.createSvg("svg", {
      attr: {
        viewBox: "0 0 24 24",
        width: "16",
        height: "16",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }
    });
    if (shape === "rect") {
      svg.createSvg("rect", {
        attr: { x: "3.5", y: "7", width: "17", height: "10" }
      });
    } else if (shape === "round") {
      svg.createSvg("rect", {
        attr: { x: "3.5", y: "7", width: "17", height: "10", rx: "3.5" }
      });
    } else if (shape === "diamond") {
      svg.createSvg("path", { attr: { d: "M12 3 L21 12 L12 21 L3 12 Z" } });
    } else {
      svg.createSvg("circle", { attr: { cx: "12", cy: "12", r: "8.5" } });
    }
  }
  positionNode(n) {
    if (!n.el) return;
    n.el.style.left = `${n.x}px`;
    n.el.style.top = `${n.y}px`;
  }
  beginRename(n) {
    const label = n.labelEl;
    if (!label) return;
    label.contentEditable = "true";
    label.addClass("is-editing");
    label.focus();
    const range = activeDocument.createRange();
    range.selectNodeContents(label);
    const sel = activeWindow.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    const finish = () => {
      label.contentEditable = "false";
      label.removeClass("is-editing");
      n.label = (label.textContent || "").trim() || "Block";
      label.textContent = n.label;
      label.removeEventListener("blur", finish);
      label.removeEventListener("keydown", onKey);
      this.refresh();
    };
    const onKey = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        label.blur();
      } else if (e.key === "Escape") {
        label.textContent = n.label;
        label.blur();
      }
      e.stopPropagation();
    };
    label.addEventListener("blur", finish);
    label.addEventListener("keydown", onKey);
    label.addEventListener("input", () => {
      n.label = label.textContent || "";
      this.drawEdges();
      this.scheduleOutput();
    });
  }
  /* ---- pointer drag handling ---- */
  onPointerMove(e) {
    if (!this.drag) return;
    const rect = this.canvasEl.getBoundingClientRect();
    const x = e.clientX - rect.left + this.canvasEl.scrollLeft;
    const y = e.clientY - rect.top + this.canvasEl.scrollTop;
    if (this.drag.kind === "pending") {
      const moved = Math.abs(e.clientX - this.drag.sx) + Math.abs(e.clientY - this.drag.sy);
      if (moved < 4) return;
      let ids = [...this.selectedNodes];
      if (ids.length === 0) ids = [this.drag.id];
      if (this.drag.alt) {
        const dups = [];
        for (const oid of ids) {
          const o = this.node(oid);
          if (o) dups.push(this.makeDuplicate(o).id);
        }
        if (dups.length) {
          ids = dups;
          this.setSelection(dups);
        }
      }
      const starts = /* @__PURE__ */ new Map();
      for (const id of ids) {
        const n = this.node(id);
        if (n) starts.set(id, { x: n.x, y: n.y });
      }
      this.canvasEl.setPointerCapture(this.drag.pointerId);
      this.drag = { kind: "move", ids, startX: x, startY: y, starts };
    }
    if (this.drag.kind === "move") {
      const dxp = x - this.drag.startX;
      const dyp = y - this.drag.startY;
      for (const id of this.drag.ids) {
        const n = this.node(id);
        const s = this.drag.starts.get(id);
        if (!n || !s) continue;
        n.x = s.x + dxp;
        n.y = s.y + dyp;
        this.positionNode(n);
      }
      this.hoverEdge = this.drag.ids.length === 1 ? this.findEdgeNear(x, y, this.drag.ids[0]) : null;
      this.drawEdges();
    } else if (this.drag.kind === "marquee") {
      const minX = Math.min(this.drag.sx, x);
      const minY = Math.min(this.drag.sy, y);
      const w = Math.abs(x - this.drag.sx);
      const h = Math.abs(y - this.drag.sy);
      this.drag.el.style.left = `${minX}px`;
      this.drag.el.style.top = `${minY}px`;
      this.drag.el.style.width = `${w}px`;
      this.drag.el.style.height = `${h}px`;
      const sel = new Set(this.drag.base);
      for (const n of this.g.nodes) {
        if (!n.el) continue;
        const nx2 = n.x + n.el.offsetWidth;
        const ny2 = n.y + n.el.offsetHeight;
        const hit = n.x < minX + w && nx2 > minX && n.y < minY + h && ny2 > minY;
        if (hit) sel.add(n.id);
      }
      this.selectedNodes = sel;
      this.applySelection();
    } else if (this.drag.kind === "edge") {
      const from = this.node(this.drag.from);
      if (!from || !from.el) return;
      const c = this.nodeCenter(from);
      this.drag.line.setAttrs({
        x1: String(c.x),
        y1: String(c.y),
        x2: String(x),
        y2: String(y)
      });
    }
  }
  onPointerUp(e) {
    if (!this.drag) return;
    if (this.drag.kind === "edge") {
      this.drag.line.remove();
      const target = activeDocument.elementFromPoint(e.clientX, e.clientY)?.closest(".mv-node");
      const fromId = this.drag.from;
      let toId = target?.dataset.id;
      if (!toId) {
        const rect = this.canvasEl.getBoundingClientRect();
        const x = e.clientX - rect.left + this.canvasEl.scrollLeft - 50;
        const y = e.clientY - rect.top + this.canvasEl.scrollTop - 20;
        const created = this.createNodeAt("rect", x, y);
        toId = created.id;
      }
      if (toId && toId !== fromId) {
        const dup = this.g.edges.some(
          (ed) => ed.from === fromId && ed.to === toId
        );
        if (!dup) {
          this.g.edges.push({
            id: `e${Date.now()}`,
            from: fromId,
            to: toId,
            label: ""
          });
        }
      }
      this.refresh();
    } else if (this.drag.kind === "move") {
      if (this.hoverEdge && this.drag.ids.length === 1) {
        this.spliceIntoEdge(this.hoverEdge, this.drag.ids[0]);
      }
      this.hoverEdge = null;
      this.refresh();
    } else if (this.drag.kind === "marquee") {
      this.drag.el.remove();
    }
    this.drag = null;
  }
  /* ---- edges drawing ---- */
  nodeCenter(n) {
    const el = n.el;
    return {
      x: n.x + el.offsetWidth / 2,
      y: n.y + el.offsetHeight / 2,
      w: el.offsetWidth,
      h: el.offsetHeight
    };
  }
  borderPoint(from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    if (dx === 0 && dy === 0) return { x: from.x, y: from.y };
    const hw = from.w / 2 + 2;
    const hh = from.h / 2 + 2;
    const scale = 1 / Math.max(Math.abs(dx) / hw, Math.abs(dy) / hh);
    return { x: from.x + dx * scale, y: from.y + dy * scale };
  }
  /** Border-to-border endpoints of an edge, or null if a node is missing. */
  edgeEndpoints(e) {
    const a = this.node(e.from);
    const b = this.node(e.to);
    if (!a?.el || !b?.el) return null;
    const ca = this.nodeCenter(a);
    const cb = this.nodeCenter(b);
    return { p1: this.borderPoint(ca, cb), p2: this.borderPoint(cb, ca) };
  }
  /** Nearest edge whose line passes within ~14px of (x,y), excluding edges
   *  already touching the given node. Used for drop-to-splice. */
  findEdgeNear(x, y, excludeNode) {
    let best = null;
    let bestDist = 14;
    for (const e of this.g.edges) {
      if (e.from === excludeNode || e.to === excludeNode) continue;
      const ends = this.edgeEndpoints(e);
      if (!ends) continue;
      const d = distToSegment(x, y, ends.p1.x, ends.p1.y, ends.p2.x, ends.p2.y);
      if (d < bestDist) {
        bestDist = d;
        best = e.id;
      }
    }
    return best;
  }
  /** Insert `nodeId` into edge `edgeId`: F→T becomes F→node→T. */
  spliceIntoEdge(edgeId, nodeId) {
    const e = this.g.edges.find((x) => x.id === edgeId);
    if (!e || e.from === nodeId || e.to === nodeId) return;
    const from = e.from;
    const to = e.to;
    const label = e.label;
    this.g.edges = this.g.edges.filter((x) => x.id !== edgeId);
    const has = (f, t) => this.g.edges.some((x) => x.from === f && x.to === t);
    if (!has(from, nodeId))
      this.g.edges.push({ id: `e${Date.now()}a`, from, to: nodeId, label });
    if (!has(nodeId, to))
      this.g.edges.push({ id: `e${Date.now()}b`, from: nodeId, to, label: "" });
  }
  drawEdges() {
    this.edgesSvg.querySelectorAll(".mv-edge-group, .mv-edge-hit, .mv-edge-line, .mv-edge-label").forEach((n) => n.remove());
    for (const e of this.g.edges) {
      const ends = this.edgeEndpoints(e);
      if (!ends) continue;
      const p1 = ends.p1;
      const p2 = ends.p2;
      const hit = this.edgesSvg.createSvg("line", { cls: "mv-edge-hit" });
      hit.setAttrs({
        x1: String(p1.x),
        y1: String(p1.y),
        x2: String(p2.x),
        y2: String(p2.y)
      });
      hit.addEventListener("pointerdown", (ev) => {
        ev.stopPropagation();
        this.select(null, e.id);
      });
      hit.addEventListener("dblclick", (ev) => {
        ev.stopPropagation();
        new EdgeLabelModal(this.app, e.label, (next) => {
          e.label = next;
          this.refresh();
        }).open();
      });
      const line = this.edgesSvg.createSvg("line", {
        cls: "mv-edge-line",
        attr: { "marker-end": "url(#mv-arrow)" }
      });
      line.setAttrs({
        x1: String(p1.x),
        y1: String(p1.y),
        x2: String(p2.x),
        y2: String(p2.y)
      });
      if (e.id === this.selectedEdge) line.addClass("is-selected");
      if (e.id === this.hoverEdge) line.addClass("is-drop-target");
      if (e.label.trim()) {
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        const t = this.edgesSvg.createSvg("text", {
          cls: "mv-edge-label"
        });
        t.textContent = e.label;
        t.setAttrs({ x: String(mx), y: String(my - 4) });
      }
    }
  }
  /* ---- output (code + render) ---- */
  refresh() {
    this.drawEdges();
    this.scheduleOutput();
  }
  scheduleOutput() {
    const code = generateMermaid(this.g);
    this.codeEl.setText(code);
    if (this.renderTimer !== null) window.clearTimeout(this.renderTimer);
    this.renderTimer = window.setTimeout(() => {
      void this.renderPreview(code);
    }, 200);
  }
  async renderPreview(code) {
    const seq = ++this.renderSeq;
    const target = createDiv();
    try {
      await import_obsidian.MarkdownRenderer.render(
        this.app,
        "```mermaid\n" + code + "\n```",
        target,
        "",
        this.renderComp
      );
    } catch (err) {
      target.empty();
      target.createDiv({
        cls: "mv-error",
        text: err instanceof Error ? err.message : String(err)
      });
    }
    if (seq !== this.renderSeq) return;
    this.previewEl.empty();
    this.previewEl.append(...Array.from(target.childNodes));
  }
  onClose() {
    if (this.renderTimer !== null) window.clearTimeout(this.renderTimer);
    this.renderComp.unload();
    this.contentEl.empty();
  }
};

/* nosourcemap */