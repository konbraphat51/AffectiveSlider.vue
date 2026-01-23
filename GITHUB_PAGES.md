# GitHub Pages 公開手順 / GitHub Pages Publishing Guide

このドキュメントでは、このリポジトリからGitHub Pagesを公開する手順を説明します。

This document explains how to publish GitHub Pages from this repository.

## 自動デプロイ / Automatic Deployment

### 初回設定 / Initial Setup

1. **GitHub リポジトリの設定を開く / Open Repository Settings**
   - リポジトリのページで「Settings」タブをクリック
   - Click the "Settings" tab on the repository page

2. **Pages セクションに移動 / Navigate to Pages Section**
   - 左サイドバーから「Pages」を選択
   - Select "Pages" from the left sidebar

3. **デプロイ方法を設定 / Configure Deployment Method**
   - **Source**: "GitHub Actions" を選択
   - **Source**: Select "GitHub Actions"
   
4. **保存 / Save**
   - 設定は自動的に保存されます
   - Settings are saved automatically

### 自動デプロイの仕組み / How Automatic Deployment Works

リポジトリには GitHub Actions ワークフロー (`.github/workflows/deploy-pages.yml`) が含まれており、以下の条件で自動的にデプロイされます：

The repository includes a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) that automatically deploys when:

- `main` ブランチにプッシュされたとき
- When pushed to the `main` branch

または
Or

- 手動でワークフローをトリガーしたとき（「Actions」タブから）
- Manually triggered from the "Actions" tab

### デプロイの確認 / Verify Deployment

1. **Actions タブを開く / Open Actions Tab**
   - リポジトリの「Actions」タブをクリック
   - Click the "Actions" tab in the repository

2. **ワークフローを確認 / Check Workflow**
   - "Deploy to GitHub Pages" ワークフローの実行状況を確認
   - Check the status of the "Deploy to GitHub Pages" workflow

3. **公開URLにアクセス / Access Published URL**
   - デプロイが成功したら、以下のURLでアクセスできます：
   - After successful deployment, access the site at:
   - https://konbraphat51.github.io/AffectiveSlider.vue/

## 手動デプロイ / Manual Deployment

手動でデモをビルドして公開する場合：

To manually build and publish the demo:

### 手順 / Steps

1. **依存関係のインストール / Install Dependencies**
   ```bash
   npm install
   ```

2. **デモのビルド / Build Demo**
   ```bash
   npm run build:demo
   ```

3. **変更をコミット / Commit Changes**
   ```bash
   git add dist/
   git commit -m "Update demo"
   git push
   ```

4. **GitHub Pages 設定（初回のみ）/ GitHub Pages Setup (First Time Only)**
   - Settings > Pages
   - Source: "GitHub Actions"
   - Save

### ビルド内容 / Build Contents

`npm run build:demo` は以下のファイルを `dist/` フォルダに生成します：

`npm run build:demo` generates the following files in the `dist/` folder:

- `index.html` - メインHTMLファイル / Main HTML file
- `assets/` - バンドルされたJavaScriptとCSSファイル / Bundled JavaScript and CSS files
- `images/` - スライダー用のPNG画像 / PNG images for sliders

## トラブルシューティング / Troubleshooting

### デプロイが失敗する / Deployment Fails

1. **Actions タブでエラーログを確認 / Check Error Logs in Actions Tab**
   - 失敗したワークフローをクリック
   - Click the failed workflow
   - 詳細なエラーメッセージを確認
   - Review detailed error messages

2. **権限を確認 / Check Permissions**
   - Settings > Actions > General
   - "Workflow permissions" で "Read and write permissions" が有効になっているか確認
   - Verify "Read and write permissions" is enabled under "Workflow permissions"

3. **Pages 設定を確認 / Verify Pages Settings**
   - Settings > Pages
   - Source が "GitHub Actions" になっているか確認
   - Verify Source is set to "GitHub Actions"

### ページが表示されない / Page Doesn't Display

1. **ビルドが成功しているか確認 / Verify Build Success**
   ```bash
   npm run build:demo
   ```

2. **ベースパスを確認 / Check Base Path**
   - `vite.config.demo.ts` の `base` 設定が `/` になっているか確認
   - Verify `base` setting in `vite.config.demo.ts` is `/`

3. **ブラウザのキャッシュをクリア / Clear Browser Cache**
   - Ctrl+Shift+R (Windows/Linux) または Cmd+Shift+R (Mac)

## 参考リンク / References

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
