# Scalable Angular Starter Kit

A pre-configured starter template for building modern, scalable, and high-performance web applications with Angular. This project is designed to simplify development and includes powerful features like **Server-Side Rendering (SSR)**, **Static Site Generation (SSG)**, **internationalization (i18n)**, and **SEO optimization**.

---

## 🚀 Features

- **Angular with SSR and SSG**
  - Combines the best of Server-Side Rendering for dynamic content delivery and Static Site Generation for fast-loading, pre-rendered pages.

- **Internationalization (i18n)**
  - Seamless support for multi-language applications using Angular's built-in i18n module.

- **SEO Optimization**
  - Pre-configured metadata management for improved search engine rankings.
  - Automatic handling of SEO requirements for SSR and SSG.

- **Scalable and Maintainable Architecture**
  - Modular folder structure for easy scaling and maintenance.

- **Development Utilities**
  - Hot Module Reloading (HMR) for faster development cycles.
  - Ready-to-use configuration for CI/CD pipelines.

---

## 💡 Work in Progress

### SEO URL
- [ ] Research and determine the best practices for implementing SEO-friendly URLs based on translations. For example: `en/about-us`, `it/chi-siamo`.
- [ ] Implement canonical URLs to avoid duplicate content issues.
- [ ] Add `Hreflang` tags to indicate language and regional targeting.

### Redirect Issues
- [ ] Ensure that accessing `http://localhost:4200/dsaasd` displays a *Page not found* message without performing a redirect.
- [ ] Ensure that accessing `http://localhost:4200/it/dsaasd` displays a *Page not found* message without performing a redirect.

### Automatic Prerendering of Routes
- [ ] Explore solutions for generating prerendered routes automatically, possibly using Node.js and `app.routes.ts` for route extraction.

