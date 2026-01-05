# My MedClinic – Static Website

This repository contains a static frontend implementation of the **My MedClinic** website.
The project is built using **pure HTML, CSS and JavaScript**, without frameworks or build tools.

The goal of this project is to provide a clean, maintainable and performant codebase,
while preserving a premium dark UI style suitable for a medical brand.

---

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (custom properties, Flexbox, Grid)
- Vanilla JavaScript (no libraries, no frameworks)

---

## Project Goals

- Clean and readable code structure
- No duplicated or unnecessary CSS/JS
- Consistent UI components (buttons, cards, spacing)
- Fully responsive layout (desktop & mobile)
- Accessible navigation (keyboard support, focus states)
- Easy to host as static files (no build step)

---

## Project Structure

```
/
├── index.html
├── oferta.html
├── oferta-psychiatria.html
├── oferta-bariatria.html
├── oferta-ortopedia.html
├── oferta-psychologia.html
├── klinika-o-nas.html
├── klinika-zespol.html
├── klinika-dla-pacjenta.html
├── klinika-praca.html
├── cennik.html
├── pakiety.html
├── blog.html
├── kontakt.html
├── bony.html
├── polityka.html
├── assets/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   └── main.js
│   └── img/
└── partials/
    ├── header.html
    └── footer.html
```

**Note:** The `partials/` folder contains reusable header and footer templates. These are currently embedded directly into each HTML file to ensure compatibility with local file access (no server required). For future updates, modify the partials and then update all HTML files accordingly.

## Features

### Cookie Banner
- Cookie consent banner with three options: Reject, Customize, Accept
- Customize option opens a modal with cookie category checkboxes
- Preferences saved in `localStorage`
- Banner hidden after user makes a choice

### Pricing Filter
- Client-side category filtering for pricing page
- Filter buttons for: All, Psychiatria, Bariatria, Ortopedia, Psychologia
- Smooth show/hide animations

### Contact Form
- HTML5 form validation
- Required fields: name, email, message, RODO checkbox
- Mailto action (can be replaced with backend endpoint)

---

## Running the Project

No build process is required.

Run using any static server, for example:

```bash
npx serve
```

Or via Python:

```bash
python -m http.server 8000
```

Or via PHP:

```bash
php -S localhost:8000
```

**Important:** While the site can be opened directly in a browser (`file://`), some features (like cookie banner) work best when served via HTTP server.

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Minimum: ES6 JavaScript support

---

## Notes

- This project intentionally avoids frameworks and external dependencies
  to keep the codebase simple, transparent and easy to maintain.
- All HTML files contain embedded header and footer (no dynamic loading)
  to ensure compatibility with static hosting and local file access.
- CSS uses custom properties (CSS variables) for easy theme customization.
- JavaScript is organized into clear sections: Navigation, Cookie Banner, Pricing Filters.

---

## License

Private project – all rights reserved.
