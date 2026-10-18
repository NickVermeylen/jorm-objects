const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8082;
const DATA_DIR = path.join(__dirname, "../src/_data");
const DESIGN_FILE = path.join(DATA_DIR, "design.json");
const SECTIONS_FILE = path.join(DATA_DIR, "homeSections.json");
const STUDIO_HTML = path.join(__dirname, "index.html");

const FONT_OPTIONS = [
  { name: "Space Mono",    url: "https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" },
  { name: "Outfit",        url: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" },
  { name: "Inter",         url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" },
  { name: "Playfair Display", url: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" },
  { name: "DM Mono",       url: "https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap" },
  { name: "Cormorant",     url: "https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,700;1,400&display=swap" },
  { name: "IBM Plex Mono", url: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400&display=swap" },
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function json(res, data, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try { resolve(JSON.parse(body)); }
      catch (e) { reject(e); }
    });
  });
}

const server = http.createServer(async (req, res) => {
  cors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // Serve the studio UI
  if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(fs.readFileSync(STUDIO_HTML, "utf8"));
  }

  // GET /api/state — all studio state in one call
  if (req.method === "GET" && req.url === "/api/state") {
    return json(res, {
      design: readJson(DESIGN_FILE),
      sections: readJson(SECTIONS_FILE),
      fonts: FONT_OPTIONS,
    });
  }

  // POST /api/design — save colors + font
  if (req.method === "POST" && req.url === "/api/design") {
    try {
      const body = await readBody(req);
      const current = readJson(DESIGN_FILE);
      const updated = {
        colors: { ...current.colors, ...body.colors },
        fonts: { ...current.fonts, ...body.fonts },
      };
      // Sync font URL from font options if name changed
      if (body.fonts && body.fonts.body) {
        const match = FONT_OPTIONS.find(f => f.name === body.fonts.body);
        if (match) updated.fonts.bodyUrl = match.url;
      }
      writeJson(DESIGN_FILE, updated);
      return json(res, { ok: true, design: updated });
    } catch (e) {
      return json(res, { error: e.message }, 400);
    }
  }

  // POST /api/sections — save section order + visibility
  if (req.method === "POST" && req.url === "/api/sections") {
    try {
      const body = await readBody(req);
      writeJson(SECTIONS_FILE, body);
      return json(res, { ok: true });
    } catch (e) {
      return json(res, { error: e.message }, 400);
    }
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Design Studio running at http://localhost:${PORT}`);
});
