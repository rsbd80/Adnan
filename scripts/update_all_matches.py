
name: RS Live Go Auto Update

on:
  schedule:
    - cron: "*/5 * * * *"
  workflow_dispatch:

permissions:
  contents: write

concurrency:
  group: rs-live-go-auto-update
  cancel-in-progress: false

jobs:
  update:
    runs-on: ubuntu-latest
    timeout-minutes: 8

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.x"

      - name: Update Channels
        run: python scripts/update_all_channels.py

      - name: Update Matches
        run: python scripts/update_all_matches.py

      - name: Commit Only Changed Files
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

          git add data/channels.m3u data/matches/

          if git diff --cached --quiet; then
            echo "No changes detected. Nothing to commit."
            exit 0
          fi

          git commit -m "Auto-update channels and matches"
          git push
