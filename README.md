# Drexler Glass Co. — website rebuild

A modern, static rebuild of [drexlerglass.com](https://www.drexlerglass.com/): plain HTML, CSS and JavaScript with no framework and no build dependencies.

## Pages

| File | Contents |
| --- | --- |
| `index.html` | Home: hero, services, testimonials, values, showroom, service area |
| `residential.html` | Every residential product, with a sticky in-page sub-nav |
| `commercial.html` | Hotels, restaurants, multifamily, retail/office, fitness, applications |
| `our-story.html` | History and timeline, team, field teams, workshop, why trust matters |
| `process.html` | 4-step process and FAQ accordion |
| `reviews.html` | Customer reviews and featured projects |
| `gallery.html` | Filterable gallery with lightbox |
| `contact.html` | Quote form, contact details, showroom, map |

## Editing

The root `*.html` files are **generated**. Edit the source files, then rebuild:

- `pages/*.html`: the main content of each page, with title and description in the top comment
- `partials/`: the shared `<head>`, header/nav and footer

```bash
python3 tools/build.py
```

Styles are in `assets/css/styles.css` (design tokens are at the top in `:root`), and interactions are in `assets/js/main.js`.

## Design

- **Palette:** warm stone `#f4f1ec`, ink `#16191c`, brushed brass `#a8834b`, glass `#dfe9ea`
- **Type:** Figtree (sans-serif) throughout, via Google Fonts
- **Logo:** `assets/img/logo.svg` (inverted with a CSS filter in the dark footer)
- **Motif:** translucent "glass pane" overlays, a nod to the product itself

## To do before launch

- Connect the quote form (`form[data-quote]` in `contact.html`) to a real endpoint, such as Formspree, Netlify Forms or the existing WordPress handler. Right now it only shows a success message.
- Confirm team titles in `pages/our-story.html`.
- Photos in `assets/img/` come from the current site.
