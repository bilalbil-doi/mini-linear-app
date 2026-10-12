# Mini-Linear/Jira Application

Ce projet est une application de gestion de tâches inspirée de Linear/Jira, construite avec une architecture monorepo.

## Structure du projet

```
monorepo/
├── apps/
│   ├── backend/      # API avec Express/NestJS + Prisma
│   └── frontend/    # Interface Next.js avec TypeScript + Tailwind CSS
├── package.json     # Configuration principale du monorepo
└── .gitignore       # Fichiers ignorés par Git
```

## Technologies utilisées

- Backend : Express/NestJS + Prisma (PostgreSQL)
- Frontend : Next.js (TypeScript) + Tailwind CSS
- Monorepo : npm workspaces
