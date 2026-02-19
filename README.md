# AI Studio Log Viewer

Google AI Studio の API ログ（JSONL形式）を会話形式で見やすく表示する GUI ツール。

## 機能

- JSONL ファイルのアップロード（ドラッグ＆ドロップ対応）
- ユーザー・モデル間の会話をチャット形式で表示
- システムプロンプト、最終回答の表示
- メッセージ内の文字列検索・置換（複数ペア対応）
- ファイル・置換設定の LocalStorage 永続化

## セットアップ

```bash
bun install
```

## 開発

```bash
bun run dev
```

## 本番起動

```bash
bun run start
```

## ビルド

```bash
bun run build
```

## Docker（Cloud Run デプロイ用）

```bash
docker build -t ai-studio-log-viewer .
docker run -p 3000:3000 ai-studio-log-viewer
```

## 技術スタック

- [Bun](https://bun.sh) - ランタイム・バンドラー
- React 19
- Tailwind CSS v4
- shadcn/ui
