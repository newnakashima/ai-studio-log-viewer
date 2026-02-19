# AI Studio Log Viewer

## 概要

Google AI Studio の API ログが見づらいので、ユーザーとシステムのやり取りのみを見やすくするためのGUIツール

## ログのサンプル

以下は実際のJSONLログの一行を見やすくしたサンプル。

```json
{
  "request": {
    "model": "models/gemini-3-flash-preview",
    "contents": [
      {
        "parts": [{ "text": "ユーザーのメッセージ" }],
        "role": "user"
      },
      {
        "parts": [{ "text": "モデルの返答" }],
        "role": "model"
      },
      {
        "parts": [{ "text": "ユーザーの追加メッセージ" }],
        "role": "user"
      }
    ],
    "generationConfig": {
      "temperature": 0.7,
      "responseMimeType": ""
    },
    "systemInstruction": {
      "parts": [{ "text": "システムプロンプト" }],
      "role": "user"
    }
  },
  "response": [
    {
      "candidates": [
        {
          "content": {
            "parts": [{ "text": "モデルの最終回答テキスト" }],
            "role": "model"
          },
          "finishReason": "STOP"
        }
      ],
      "usageMetadata": {
        "promptTokenCount": 100,
        "candidatesTokenCount": 50,
        "totalTokenCount": 150
      }
    }
  ],
  "turnId": "xxxxxxxxxxxxxxxx",
  "datasetIds": ["xxxxxxxxxxxxxxxx"],
  "createTime": "2026-01-01T00:00:00.000000Z",
  "responseStatus": []
}
```

この内、発生時刻、ユーザーのメッセージ、モデルの返答、モデルの最終回答テキストのみ抽出して、見やすい形式で画面に表示させたい。

## 機能要件

- ファイルアップロードUIがあり、そこから JSONL ファイルをアップロードできること
- ユーザーとモデルのメッセージ内の、特定の文字列について検索及び置換ができるUIがあること
  - 置換後はそれに合わせて画面表示も更新されること
- アップロードされたファイル及び置換文字列の設定はユーザーのローカルストレージに保存され、次回画面表示した際は自動的に再現されること
- 会話形式を再現するような形で表示させること

## 非機能要件

- Google Cloud Run にデプロイするため、Bun 実行環境の Dockerfile を作成すること