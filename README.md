# Portfolio V4 — [shrd.in](https://shrd.in)

Personal portfolio of Sharad Shinde. Static, fast, and dependency-light.

## Stack

- [Astro 5](https://astro.build) — static output, zero client frameworks
- Plain CSS with native nesting — no preprocessor, design tokens in [`src/styles/global.css`](src/styles/global.css)
- Deployed on Netlify (config in [`netlify.toml`](netlify.toml))

The only client-side JS is ~30 lines inline: scroll-reveal (IntersectionObserver), the cursor spotlight, and the mobile nav toggle.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serve the production build
```

## Edit content

All copy, nav, skills, projects, and the timeline live in [`src/data/site.json`](src/data/site.json). Images live in `public/assets/`.

## Credits

Originally based on [Astro Portfolio](https://github.com/rebelchris/astro-portfolio), heavily redesigned since.
