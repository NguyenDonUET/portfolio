---
name: commit-and-push
description: Creates git commits for all working-tree changes and pushes to the remote. Breaks unrelated changes into small Conventional Commits. Use when the user asks to commit, create a commit, commit and push, push code, or ship local changes.
---

# Commit and Push

Create a commit for all code changes and push code. If there're many code changes please break them into small commmits. Commit message must follow git commit convention.

## When this skill is invoked

Push is requested. After committing, push to the tracked remote.

## Safety

- NEVER update git config
- NEVER run destructive/irreversible commands (`push --force`, `reset --hard`, etc.) unless the user explicitly asks
- NEVER skip hooks (`--no-verify`, `--no-gpg-sign`) unless the user explicitly asks
- NEVER force-push `main`/`master`; warn if the user asks
- NEVER amend unless all of: user asked (or a hook auto-modified files from a commit you just created), HEAD was created by you this conversation, and the commit is not pushed
- NEVER use `git` with `-i` (`git add -i`, `git rebase -i`) — interactive input is unsupported
- NEVER commit secrets (`.env`, credentials, private keys). Warn and skip those files
- Do not commit if there is nothing to commit

## Step 1 — Inspect (run in parallel)

```bash
git status
git diff && git diff --staged
git log -8 --oneline
git branch -vv
```

Use `git log` to match this repo's tone (imperative vs past tense) while still using Conventional Commits.

## Step 2 — Group changes into small commits

One logical change per commit. Split when diffs mix unrelated concerns.

**Group by intent, not by file type:**

| Group | Typical files |
|---|---|
| feature | new UI, providers, feature modules |
| fix | bugfix in existing files |
| refactor | same behavior, restructured code |
| style | formatting-only (no logic) |
| chore | deps, lockfile, config |
| docs | README, comments-only markdown |
| test | tests only |
| perf | performance-only changes |
| ci | CI/workflow files |
| build | bundler/tsconfig/tooling |

**Rules:**

- Keep a feature and its tests together if they implement the same change
- Keep `package.json` + lockfile with the commit that added/updated the dependency
- Do not mix unrelated features in one commit
- Split by **paths** (`git add <files>`). Do not use patch/hunk staging
- If everything is one cohesive change, make **one** commit
- Empty or generated junk (`.DS_Store`) — do not commit

## Step 3 — Commit each group

Stage only that group's files, then commit. Repeat until the working tree is clean of intended changes.

Commit messages **must** follow Conventional Commits:

```
<type>(<optional-scope>): <imperative summary>
```

Optional body (why, not what) after a blank line when the summary is not enough.

**Types:** `feat` `fix` `docs` `style` `refactor` `perf` `test` `build` `ci` `chore` `revert`

**Summary:**

- Imperative, present tense: "add", "fix", "default" — not "added"/"adds"
- Lowercase after the colon unless a proper noun
- No trailing period
- ~72 characters
- Scope optional: `feat(theme):`, `fix(scroll):`

Always pass the message via HEREDOC:

```bash
git commit -m "$(cat <<'EOF'
feat(scroll): add Lenis smooth scrolling

Wire a site-wide provider so anchors and overlays share one scroller.
EOF
)"
```

If a pre-commit hook fails, fix the issue and create a **new** commit. Do not amend.

If a hook auto-modifies files after a successful commit you created (and it is not pushed), stage those files and amend **only then**.

## Step 4 — Push once

After all commits succeed:

```bash
git status
git push -u origin HEAD
```

If the branch has no upstream, `-u` is required. Do not force-push.

## Step 5 — Report

Reply with each commit SHA + message, then confirm the push (remote/branch). If something was skipped (secrets, empty tree), say so.

## Examples

**Single cohesive change:**

```
feat(theme): default to dark when no preference is stored
```

**Many unrelated changes — split:**

```
feat(nav): add side rail section links
fix(dialog): stop Lenis while the modal is open
chore: add lenis dependency
```
