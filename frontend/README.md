# Ambideckstrous — Client

This is the React front-end for Ambideckstrous, scaffolded with Vite (`react-ts` template).

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Getting started

```bash
npm install
npm run dev
```

The dev server proxies nothing by default — point API calls at the backend's URL (see `../backend`) until a dev proxy is configured in `vite.config.ts`.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules. See the [Vite React TS template docs](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for the recommended `tseslint.config` setup using `strictTypeChecked`/`stylisticTypeChecked` and `eslint-plugin-react-x` / `eslint-plugin-react-dom`.
