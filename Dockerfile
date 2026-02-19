FROM oven/bun:1 AS base
WORKDIR /app

# build
FROM base AS build
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/src/index.ts ./src/index.ts

EXPOSE 3000
CMD ["bun", "src/index.ts"]
