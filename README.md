# 🎨 Componentes Personalizados - Tarea 3

> Proyecto desarrollado con LitElement como parte de la Tarea 3 para la asignatura de Componentes Personalizados.

## 🎯 Objetivo General

Desarrollar dos componentes visualmente personalizables utilizando **CSS Variables** y estilos dinámicos en **LitElement**, alineados con la identidad visual de la **ESPE**.

## 🎯 Objetivos Específicos

- Implementar **variables CSS** para permitir la personalización del tema (claro/oscuro).
- Aplicar **estilos condicionales** según atributos como `lowstock`, `theme`, `hasDiscount`.
- Garantizar **accesibilidad visual**, contraste adecuado y responsividad.
- Integrar **colores institucionales** (verde ESPE `#006935`, amarillo ESPE `#FFE700`) y tipografía Arial/Roboto.

---

## 🧩 Componentes

### 1. `<product-card>` (Horizontal)

> Componente tipo ficha horizontal con imagen a la izquierda y detalles a la derecha.

📸 **Captura:**

![espe-card](.img/horizontalModoClaro.jpg)

### 2. `<product-grid>` (Vertical)

> Componente tipo tarjeta vertical con imagen superior y detalles inferiores.

📸 **Captura:**

![espe-product-card](.img/verticalModoClaro.jpg)

### 3. `<product-grid>` (Vertical y horizontal modo oscuro)

> Componentes tipo tarjeta vertical y vertical modo oscuro

📸 **Captura:**

![espe-product-card](.img/verthoriModoOscuro.jpg)

---

## 🛠️ Atributos Soportados

| Atributo       | Tipo     | Descripción                                      |
|----------------|----------|--------------------------------------------------|
| `name`         | `String` | Nombre del producto                              |
| `image`        | `String` | URL de la imagen                                 |
| `rating`       | `Number` | Valor de la calificación (★)                     |
| `sales`        | `Number` | Número de ventas                                 |
| `lowstock`     | `Boolean`| Marca si hay pocas unidades                      |
| `offer`        | `Number` | Porcentaje de descuento                          |
| `sku`          | `String` | Código del producto                              |
| `currentPrice` | `Number` | Precio actual                                    |
| `originalPrice`| `Number` | Precio anterior (tachado si hay descuento)       |
| `hasDiscount`  | `Boolean`| Indica si se muestra el descuento                |
| `quantity`     | `Number` | Cantidad seleccionada en carrito                 |
| `isFavorite`   | `Boolean`| Marca como favorito (con ícono)                  |
| `theme`        | `String` | Soporta: `"light"` (por defecto) o `"dark"`     |

---

## 🎨 Estilos Dinámicos y Responsivos

### Variables CSS utilizadas

```css
--color-primario: #006935;
--color-secundario: #FFE700;
--color-peligro: #DF0303;
--bg-claro: #ffffff;
--bg-oscuro: #1f2937;
--text-claro: #000000;
--text-oscuro: #ffffff;
--font: 'Arial', 'Roboto', sans-serif;
```

### Modo Oscuro

```html
<espe-card theme="dark" ... ></espe-card>
<espe-product-card theme="dark" ... ></espe-product-card>
```

### Hover Interactivo

Los botones como “Agregar” y los contenedores `.card` aplican transiciones:

```css
.card:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.add-button:hover {
  background-color: #004d26;
}
```

---

## 🧪 Ejemplo de Uso

```html
<espe-product-card
  name="Audífonos Gamer Pro"
  image="./img/headphones.png"
  rating="4.8"
  sales="120"
  lowstock
  offer="15"
  currentPrice="49.99"
  originalPrice="59.99"
  hasDiscount
  sku="XTR-4431"
  theme="dark"
></espe-product-card>
```

---

## 📁 Estructura del Proyecto

```
product_grid/
├── src/
│   ├── product-card.js           # Componente horizontal
│   ├── product-grid.js           # Componente vertical
│   └── styles/
│       └── main.css              # (Opcional) Variables globales
├── index.html
├── webpack.config.js
├── package.json
└── docs/
    ├── espe-card-preview.png
    └── espe-product-card-preview.png
```

---

## 📚 Diferencias entre estilos estáticos y dinámicos

- **Estilos Estáticos**: definidos directamente con valores fijos en CSS.
- **Estilos Dinámicos con CSS Variables**: permiten cambiar el diseño global desde atributos, soportan temas y facilitan reutilización.

---

## ✅ Ventajas de CSS Variables

- Fáciles de personalizar sin modificar código fuente.
- Permiten heredar estilos en Shadow DOM.
- Compatibles con temas y modo oscuro.
- Mejoran la escalabilidad y mantenimiento del código.