# 📋 DOCUMENTACIÓN PARA MODIFICAR EL SIMULADOR G5

## 🔧 CÓMO HACER CAMBIOS IMPORTANTES

### 1. 📞 CAMBIAR NÚMERO DE TELÉFONO DEL CHATBOT

**Archivos a modificar:**
- `app/page.tsx` (líneas 165 y 178)
- `app/api/chatbot/route.ts` (línea donde aparece el número en las respuestas)

**Buscar y reemplazar:**
\`\`\`
+57 300-123-4567
\`\`\`

### 2. 🖼️ AGREGAR IMÁGENES DE BILLETES

**Archivo:** `components/package-card.tsx`

**Ubicación:** Busca el comentario `/* AQUÍ PUEDES AGREGAR LAS IMÁGENES DE LOS BILLETES */`

**Reemplazar:**
\`\`\`tsx
<div className="bg-white rounded border-2 border-dashed border-gray-300 h-20 flex items-center justify-center">
  <span className="text-xs text-gray-500">Billete ${bill.denomination.toLocaleString()}</span>
</div>
\`\`\`

**Por:**
\`\`\`tsx
<img 
  src="/ruta-a-tu-imagen-billete-1.jpg" 
  alt="Billete G5" 
  className="w-full h-20 object-cover rounded"
/>
\`\`\`

### 3. 🎥 AGREGAR VIDEO DE PRUEBA DE CALIDAD

**Archivo:** `components/package-card.tsx`

**Ubicación:** Busca el comentario `/* AQUÍ PUEDES AGREGAR EL VIDEO DE PRUEBA DE CALIDAD */`

**Reemplazar:**
\`\`\`tsx
<div className="bg-white rounded p-2 border-2 border-dashed border-gray-300 h-16 flex items-center justify-center">
  <span className="text-xs text-gray-500">Video: Prueba de Calidad</span>
</div>
\`\`\`

**Por:**
\`\`\`tsx
<video 
  controls 
  className="w-full h-16 rounded"
  poster="/thumbnail-video.jpg"
>
  <source src="/video-prueba-calidad.mp4" type="video/mp4" />
  Tu navegador no soporta video HTML5.
</video>
\`\`\`

### 4. 🤖 MODIFICAR RESPUESTAS DEL CHATBOT

**Archivo:** `app/api/chatbot/route.ts`

**Ubicación:** Busca el objeto `chatbotResponses` y modifica las respuestas según necesites.

### 5. 💰 CAMBIAR PRECIOS DE PAQUETES

**Archivo:** `app/page.tsx`

**Ubicación:** Busca el array `packages` (línea ~10) y modifica:
- `price`: Precio de venta
- `originalPrice`: Precio "original" tachado
- `bills`: Denominaciones y cantidades
- `totalValue`: Valor total de los billetes

### 6. 🗑️ ELIMINAR EL CHATBOT COMPLETAMENTE

Si quieres quitar el chatbot:

1. **En `app/page.tsx`:** Elimina la línea `import Chatbot from "@/components/chatbot"` y `<Chatbot />`
2. **Elimina archivos:**
   - `components/chatbot.tsx`
   - `app/api/chatbot/route.ts`

### 7. 📱 CAMBIAR INFORMACIÓN DE CONTACTO

**Archivo:** `app/page.tsx`

**Buscar y modificar:**
- Email: `info@billetesG5.com`
- Teléfono: `+57 300-123-4567`
- Nombre del sitio: `Billetes G5 Colombia`

### 8. 🎨 CAMBIAR COLORES Y ESTILOS

**Colores principales usados:**
- Verde: `bg-green-600`, `text-green-600`
- Rojo (urgencia): `bg-red-600`, `text-red-600`
- Azul (chatbot): `bg-blue-600`, `text-blue-600`
- Amarillo (advertencias): `bg-yellow-600`, `text-yellow-600`

### 9. 📊 AGREGAR MÉTRICAS Y TRACKING

Para agregar Google Analytics o tracking:

**Archivo:** `app/layout.tsx`

Agregar en el `<head>`:
\`\`\`tsx
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
\`\`\`

## 🚨 RECORDATORIOS IMPORTANTES

1. **Propósito Educativo:** Este simulador es SOLO para fines educativos
2. **Disclaimer:** Siempre mantén visible el texto educativo en el footer
3. **Responsabilidad:** Úsalo solo para enseñar sobre técnicas de estafa
4. **Backup:** Haz respaldo antes de hacer cambios importantes

## 📁 ESTRUCTURA DE ARCHIVOS

\`\`\`
proyecto/
├── app/
│   ├── page.tsx (Página principal)
│   ├── layout.tsx (Layout general)
│   └── api/chatbot/route.ts (API del chatbot)
├── components/
│   ├── chatbot.tsx (Componente del chatbot)
│   ├── package-card.tsx (Tarjetas de paquetes)
│   └── testimonial-card.tsx (Testimonios)
├── scripts/
│   └── g5-database-setup.sql (Base de datos)
└── DOCUMENTACION-CAMBIOS.md (Este archivo)
