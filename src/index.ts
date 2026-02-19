import { serve } from "bun";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  const distDir = path.resolve(import.meta.dir, "..", "dist");

  const server = serve({
    routes: {
      "/*": async (req) => {
        const url = new URL(req.url);
        const pathname = url.pathname;
        const filePath = path.join(
          distDir,
          pathname === "/" ? "index.html" : pathname
        );
        const file = Bun.file(filePath);

        if (await file.exists()) {
          return new Response(file);
        }

        // SPA fallback
        return new Response(Bun.file(path.join(distDir, "index.html")));
      },
    },
  });

  console.log(`Server running at ${server.url}`);
} else {
  // Development: Bun の HTML バンドリング + HMR
  // @ts-ignore - Bun 固有の HTML モジュールインポート
  const { default: index } = await import("./index.html");

  const server = serve({
    routes: {
      "/*": index,
    },
    development: {
      hmr: true,
      console: true,
    },
  });

  console.log(`Server running at ${server.url}`);
}
