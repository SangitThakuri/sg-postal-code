#!/usr/bin/env bash
# Applies migrations then loads every d1-seed/*.sql sector file into D1.
# Usage: scripts/seed-d1.sh --local   (or --remote, once the database is created)
set -euo pipefail

MODE="${1:---local}"
DB_NAME="sgpostalcode-db"

if [ ! -d "d1-seed" ]; then
  echo "d1-seed/ not found — run: node scripts/generate-d1-seed.js"
  exit 1
fi

echo "Applying migrations ($MODE)…"
npx wrangler d1 migrations apply "$DB_NAME" "$MODE"

# Every seed file is a plain INSERT with no dedup key — running this against
# a table that already has data (e.g. re-running the weekly refresh, or
# re-running this manually) silently duplicates every row instead of
# replacing them. Confirmed this happened: a manual rerun doubled
# buildings from 141,726 to 283,452 rows. Clearing first makes the seed
# idempotent regardless of how many times it runs.
echo "Clearing existing buildings ($MODE)…"
npx wrangler d1 execute "$DB_NAME" "$MODE" --command="DELETE FROM buildings;"

echo "Seeding $(ls d1-seed/*.sql | wc -l | tr -d ' ') files ($MODE)…"
for f in d1-seed/*.sql; do
  echo "  $f"
  npx wrangler d1 execute "$DB_NAME" "$MODE" --file="$f"
done

echo "Done."
