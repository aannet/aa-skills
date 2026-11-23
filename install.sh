#!/usr/bin/env bash
# Installe les skills du repo par symlinks dans les dossiers lus par Claude / OpenCode.
# Usage: ./install.sh          -> symlinks
#        ./install.sh --zip    -> génère dist/<skill>.zip (upload claude.ai)
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGETS=("$HOME/.claude/skills" "$HOME/.agents/skills")

if [[ "${1:-}" == "--zip" ]]; then
  mkdir -p "$REPO/dist"
  for dir in "$REPO"/skills/*/; do
    name="$(basename "$dir")"
    rm -f "$REPO/dist/$name.zip"
    python3 -c 'import shutil,sys; shutil.make_archive(sys.argv[1], "zip", sys.argv[2], sys.argv[3])' "$REPO/dist/$name" "$REPO/skills" "$name"
    echo "zip  dist/$name.zip"
  done
  exit 0
fi

for target in "${TARGETS[@]}"; do
  mkdir -p "$target"
  for dir in "$REPO"/skills/*/; do
    name="$(basename "$dir")"
    link="$target/$name"
    src="${dir%/}"
    if [[ -L "$link" ]]; then
      if [[ "$(readlink "$link")" == "$src" ]]; then echo "ok   $link"; continue; fi
      rm "$link"
    elif [[ -e "$link" ]]; then
      mv "$link" "$link.bak"
      echo "bak  $link -> $link.bak"
    fi
    ln -s "$src" "$link"
    echo "link $link -> $src"
  done
done
