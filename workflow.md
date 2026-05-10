# GitHub Workflow

Small team workflow with linear history via squash merges.

---

## Branch Naming

Use a prefix to signal intent:

| Prefix                | Use for                     |
| --------------------- | --------------------------- |
| `fix/short-name`      | Bug fixes                   |
| `feature/short-name`  | New features                |
| `refactor/short-name` | Cleanup, no behavior change |
| `docs/short-name`     | Documentation only          |

Examples: `fix/login-redirect`, `feature/banner-curve`, `refactor/color-tokens`

---

## One-Time Repo Setup

In **Settings > General**:

- Enable **Allow auto-merge**
- Set default merge to **Squash merge**
- Require **status checks to pass** on `main`

---

## Daily Workflow

```bash
# 1. Start from a fresh main
git checkout main && git pull
git checkout -b fix/short-name

# 2. Make changes and commit
git commit -am "Fix: short description"

# 3. Push and open PR
gh pr create --fill

# 4. Queue auto-merge once CI is green
gh pr merge --auto --squash
```

### If CI fails after queuing:

```bash
gh pr merge --disable-auto
# fix, commit, push — then re-queue:
gh pr merge --auto --squash
```

---

## Stacked Changes (Task B depends on Task A)

```bash
# While on branch-a:
git checkout -b feat/task-b
gh pr create --base feat/task-a --fill

# After task-a merges, update task-b manually:
git fetch origin && git rebase origin/main
gh pr edit --base main
```

---

## Useful Commands

```bash
gh pr checks --watch   # watch CI live
gh pr list             # see all open PRs
```
