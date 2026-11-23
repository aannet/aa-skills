# aa-skills

Mes skills perso pour Claude (Code / claude.ai) et OpenCode. Ce repo est la source de vérité : les outils lisent des symlinks vers `skills/`.

## Skills

| Skill | Usage |
|---|---|
| `aa-8020-pareto` | Prendre du recul, prioriser et arbitrer avec le 80/20 (perso, archi, business). |
| `aa-clarity-polish` | Alléger un livrable (chiffres, jargon, réponse d'abord). Inclut `scripts/polish-lint.mjs`. |
| `aa-project-brief` | Interview structurée puis génération d'un brief projet en Markdown. |
| `aa-writing-style` | Style rédactionnel AA, avec densité S / M / L. |

## Installation

```bash
git clone git@github.com:<user>/aa-skills.git ~/projects-github/aa-skills
cd ~/projects-github/aa-skills
./install.sh
```

Crée des symlinks dans `~/.claude/skills/` et `~/.agents/skills/` (OpenCode). Les vraies copies existantes sont sauvegardées en `.bak`. Le script est relançable sans risque.

Mise à jour : `git pull` (les symlinks suffisent).

### claude.ai (web / desktop)

```bash
./install.sh --zip   # génère dist/<skill>.zip
```

Puis Settings > Capabilities > Skills > Upload. Penser à ré-uploader après modification.

## Hors périmètre (à installer séparément)

- `humanizer`, `taste-skill` : repos tiers.
- Skills `twg*` : gérées par la CLI `twg`.
- Skills Anthropic (`pdf`, `docx`, `xlsx`, `pptx`…) : synchronisées par claude.ai.
