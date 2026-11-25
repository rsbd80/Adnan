# RsLive Go — Match JSON format

Add one JSON file per match in this folder. Use names such as `match-2.json`, `match-3.json`, `match-4.json` and so on. Do not edit `index.json`; GitHub Actions generates it automatically.

Example file (`match-2.json`):

```json
{
  "match": {
    "id": 2,
    "name": "Team A Vs Team B",
    "teamA": "Team A",
    "teamB": "Team B",
    "teamALogo": "https://example.com/team-a.png",
    "teamBLogo": "https://example.com/team-b.png",
    "category": "Live Sports",
    "matchType": "Football",
    "logoUrl": "https://example.com/event.png",
    "url": "",
    "streams": [],
    "startTime": "2026-11-26T20:00:00+06:00",
    "endTime": "2026-11-26T22:00:00+06:00",
    "enabled": true,
    "show": "yes",
    "status": "auto",
    "section": "liveSports"
  }
}
```

- Use Bangladesh local time with `+06:00` in `startTime` and `endTime`.
- `LIVE` appears automatically between start and end time.
- `UPCOMING` and a live countdown appear before `startTime`.
- The card disappears after `endTime`.
- Set `enabled` to `false` or `show` to `no` to hide a match manually.
- Put a working stream URL in `url` or in `streams`. The updater may refresh matching streams from the sports M3U playlist.
- The website reads `/data/matches/index.json`, generated automatically by the workflow.
