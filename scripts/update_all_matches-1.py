name: Auto Update All Match Cards

on:
  schedule:
    - cron: "*/5 * * * *"
  workflow_dispatch:
  push:
    paths:
      - "data/matches/**"
      - "scripts/update-matches.py"
      - ".github/workflows/auto-update-match-1.yml"

permissions:
  contents: write

concurrency:
  group: rs-live-go-match-update
  cancel-in-progress: false

jobs:
  update-matches:
    runs-on: ubuntu-latest
    timeout-minutes: 8
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.x"

      - name: Build all match cards index and refresh matching servers
        run: python scripts/update-matches.py

      - name: Commit changed match JSON files
        run: |
          if git diff --quiet -- data/matches; then
            echo "No match JSON changes."
            exit 0
          fi
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add data/matches/*.json
          git commit -m "Auto-update all live match cards"
          git push
