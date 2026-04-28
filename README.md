# Logia Masónica Ing. Manuel Savio Nº 567 — Sitio Web

Sitio web institucional de la **Respetable Logia Ing. Manuel Savio Nº 567**, Oriente de Ramallo, Buenos Aires, Argentina. Construido bajo el amparo de la Gran Logia de la Argentina de Libres y Aceptados Masones.

---

## Estructura del proyecto

```
IngManuelSavio/
├── index.html          # Fuente principal — editar este archivo
├── logo.png            # Logo masónico de la logia
├── templo.jpg          # Foto del templo (fondo del hero)
├── savio.png           # Retrato del General Manuel N. Savio
├── build.mjs           # Script de build: minifica y ofusca
├── package.json        # Dependencias y script npm run build
├── package-lock.json   # Versiones exactas de dependencias
├── .gitignore          # Excluye node_modules/, dist/, *.psd
├── .github/
│   └── workflows/
│       └── static.yml  # CI/CD: build automático + deploy a GitHub Pages
└── dist/               # Generado por build.mjs — NO editar manualmente
    ├── index.html      # Versión ofuscada y minificada para producción
    ├── logo.png
    ├── templo.jpg
    └── savio.png
```

---

## Desarrollo local

### Ver el sitio en el navegador

Abrir `index.html` directamente en el navegador o usar cualquier servidor estático:

```bash
# Con Node.js (npx, sin instalación)
npx serve .

# Con Python
python -m http.server 8080
```

### Editar el sitio

**Siempre editar `index.html`**, nunca los archivos dentro de `dist/`.

El archivo está organizado en secciones con comentarios:

| Sección | Descripción |
|---|---|
| `NAV` | Barra de navegación fija |
| `HERO` | Pantalla completa con foto del templo |
| `ABOUT` | Historia y datos de la logia |
| `PRINCIPLES` | Los 6 principios masónicos |
| `BIOGRAPHY` | Biografía del General Savio |
| `MANIFESTO` | Cita central |
| `ACTIVITIES` | Tenidas, plancha, iniciación, filantropía |
| `JOIN` | Requisitos + formulario de ingreso |
| `CONTACT` | Datos de contacto |

---

## Build para producción

El comando de build genera `dist/` con el código ofuscado y listo para publicar:

```bash
npm install       # solo la primera vez
npm run build     # genera dist/
```

**Qué hace el build:**
- **JS** → ofuscado con `javascript-obfuscator` (variables hexadecimales, strings en Base64, flujo alterado)
- **CSS + HTML** → minificados con `html-minifier-terser` (sin espacios ni comentarios)
- **Imágenes** → copiadas a `dist/` tal cual

---

## Deploy automático (GitHub Pages)

Cada `git push` a `main` dispara el workflow `.github/workflows/static.yml` que:

1. Instala dependencias (`npm install`)
2. Corre el build (`node build.mjs`)
3. Publica `dist/` en GitHub Pages

El sitio queda disponible en:
**https://niko3400.github.io/IngManuelSavio/**

Ver el estado del deploy en:
**https://github.com/niko3400/IngManuelSavio/actions**

---

## Imágenes

| Archivo | Uso | Recomendación |
|---|---|---|
| `logo.png` | Logo en la barra de navegación | Fondo transparente, mínimo 200×200 px |
| `templo.jpg` | Fondo del hero (pantalla principal) | Mínimo 1920×1080 px, paisaje |
| `savio.png` | Retrato en sección biografía | Formato vertical (retrato), alta resolución |

Para reemplazar cualquier imagen, subir el nuevo archivo con el mismo nombre.

---

## Formulario de contacto

El formulario de ingreso abre el cliente de correo del visitante con los datos precargados. Para conectarlo a un backend real (ej. Formspree, EmailJS) editar la función `handleSubmit` al final de `index.html`.

---

## Contador de visitantes

Usa [CountAPI](https://countapi.xyz/) (gratuito, sin registro). El contador incrementa una sola vez por sesión de navegador para evitar inflación por recargas.

Namespace: `masoneriaramallo` · Key: `lms567`

---

## Contacto del desarrollador

jniko340@hotmail.com
