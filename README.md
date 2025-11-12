## Users Admin Dashboard

A production-lean users administration screen backed by [DummyJSON](https://dummyjson.com). The app demonstrates server-driven pagination, debounced search, gender filtering, and a11y-friendly details views, all powered by React Query for resilient data fetching.

---

### Highlights

- **Server pagination:** `limit=10` and `skip` parameters keep requests efficient.
- **Debounced search:** 400 ms debounce targets `/users/search` and resets cleanly.
- **Gender filter:** Toggle All / Male / Female; search results respect the filter client-side.
- **User details dialog:** Radix Dialog surfaces contact, company, and address info with managed focus.
- **Error, loading & empty states:** Clear feedback with Retry wired to the active query.
- **Responsive & theme aware:** Mobile-friendly table plus dark mode via `next-themes`.

---

### Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, RSC-friendly)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- [Tailwind CSS 4](https://tailwindcss.com/) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- [shadcn/ui](https://ui.shadcn.com/)
- [next-themes](https://github.com/pacocoursey/next-themes) for dark mode

---

### Getting Started

```bash
# install dependencies
npm install

# run in development (http://localhost:3000)
npm run dev

# lint checks
npm run lint

# production build
npm run build
npm run start
```

DummyJSON requires no API keys; all requests are made directly from the browser.

---

### Project Structure

```
src/
├─ app/                # Next.js layout & routing
├─ lib/                # React Query provider, theme helpers
├─ components/         # Reusable UI primitives (shadcn)
└─ features/users/     # Users domain: API, hooks, UI
```

Key UI:

- `features/users/components/UsersList.tsx` orchestrates search, pagination, and filters.
- `features/users/api/users-api.ts` centralises DummyJSON calls.
- `components/theme-toggle.tsx` handles the light/dark mode toggle.

---

### Testing Error States

1. Open DevTools → Network → check **Offline** (or block `https://dummyjson.com/*`).
2. Trigger a fetch (paginate, search, or open details).
3. Observe the error banner and Retry control.
4. Restore connectivity and hit Retry to ensure recovery.

---

### Accessibility Notes

- Radix Dialog manages focus trapping and ESC to close.
- Search input, rows, and pagination controls expose keyboard and screen-reader-friendly semantics.
- Dialog titles remain available via `VisuallyHidden` while the modal is loading.

---

### Credits

Made by [aaronhash](https://github.com/aaronhash) as part of a timed React + TypeScript challenge. Around ~90 mins dev time since initial project skeleton.

Feedback and suggestions are welcome!
