# Contributing to Layr

Thank you for considering a contribution. This project is built by a single developer with limited weekly hours, so well-scoped, considered contributions are especially valued.

## Before you start

**For bug reports and small fixes** — go ahead, open an issue or PR.

**For larger features or design changes** — please open an issue first to discuss. Layr has strong opinions about visual identity and component architecture, and a PR that doesn't fit the direction is wasted effort for both of us.

## Bug reports

Use the bug report template when opening an issue. Include:

- Home Assistant version
- Layr version (or commit hash if building from source)
- Browser + OS
- The full YAML config of the affected card
- Browser console errors (F12 → Console)
- Steps to reproduce

A screenshot is worth a thousand "it looks weird" descriptions.

## Feature requests

Use the feature request template. Be specific:

- What problem does this solve in your daily HA usage?
- Is this something a Premium-tier card might cover later?
- Have you considered how it fits the Monolith aesthetic?

Feature requests that boil down to "make the Room Card more like another card" will probably be declined politely. The goal is *fewer cards, designed with intent*.

## Pull requests

### Code style

- TypeScript strict mode is required
- Use Lit decorators (`@property`, `@state`, `@customElement`)
- No new runtime dependencies without prior discussion
- Match the existing code organization (types → constants → helpers → component → styles)

### Visual changes

- The Monolith aesthetic is non-negotiable for the Free Card Pack
- Color palette is defined in CSS variables — use them, don't introduce new ones
- Fraunces for numbers, Geist for UI labels, no third font without discussion
- Animations: 300–400ms ease curves, GPU-friendly transforms only

### Commits

- One logical change per commit
- Conventional Commits style preferred: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `chore:`
- Include the affected component in the message: `feat(room-card): add cover position display`

### Before submitting

```bash
npm run type-check    # must pass
npm run build         # must succeed without warnings
```

Test the card in your own HA setup before submitting. Screenshots of the before/after state in the PR description are very welcome.

## Development setup

See [SETUP.md](SETUP.md) for the full local development workflow.

## License

By contributing, you agree that your contributions will be licensed under the same MIT license as the project.

## Code of Conduct

Be decent. The HA community has a reputation for being kind and helpful — let's keep it that way. Disagreements are fine; condescension and personal attacks are not.

---

If you're unsure about anything, open an issue and ask. There are no stupid questions.
