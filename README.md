# Studio Creative Portfolio

Sitio estatico multipagina para un portafolio de diseno. No requiere `Node.js`, gestor de paquetes ni proceso de build: basta un servidor HTTP para desarrollo local y despliegue.

## Stack

- HTML5
- CSS3
- JavaScript vanilla
- Google Fonts y Font Awesome por CDN
- FormSubmit en modo AJAX para el formulario de contacto

## Estructura

- `index.html`: landing principal y formulario de contacto
- `styles.css`: estilos globales y layouts
- `script.js`: interacciones, animaciones y envio del formulario
- `proyecto-*.html`: paginas de detalle de proyectos
- `blog-*.html`: paginas de articulos
- `assets/`: recursos estaticos

## Ejecutar en local

Requisito recomendado: `Python 3`.

```powershell
cd "D:\OneDrive - POLICIA NACIONAL DE COLOMBIA\Proyectos Web\portfolio-designer"
python -m http.server 8787
```

Abre `http://127.0.0.1:8787/index.html`.

No abras `index.html` con `file://`. El formulario usa `fetch` y necesita ejecutarse sobre `http://` o `https://`.

## Formulario de contacto

El formulario principal en `index.html` ya esta conectado a FormSubmit y envia por AJAX, sin salir de la pagina.

Configuracion:

1. Cambia el correo del bloque de contacto por tu correo real:
   `href="mailto:tu-correo@dominio.com"`
2. Guarda el cambio y levanta el sitio con un servidor local.
3. Haz un primer envio de prueba.
4. FormSubmit enviara un correo de activacion al destinatario.
5. Confirma la activacion desde ese correo.
6. A partir de ahi, los envios llegaran normalmente a esa bandeja.

Notas:

- El script toma el destinatario desde el enlace `mailto:` de la seccion de contacto.
- El formulario incluye un honeypot basico para reducir spam.
- Si cambias el correo visible, el destino del formulario cambia con el mismo valor.

## WhatsApp

Las tarjetas de servicios, el enlace directo de contacto y el boton flotante usan el mismo numero configurado en el bloque de contacto:

- `href="tel:+573125745768"`

Si cambias ese `tel:`, los enlaces de WhatsApp se actualizan automaticamente desde `script.js`.

## Despliegue

Puedes publicar el proyecto como sitio estatico en:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

No necesitas comando de build. Solo publica el contenido del directorio raiz.

## Pendientes conocidos

- Los formularios de newsletter del footer ahora son funcionales usando FormSubmit y guardan las suscripciones en LocalStorage como respaldo.
- Las redes sociales aun apuntan a `#`; conviene reemplazarlas por URLs reales antes de publicar.
