import { LitElement, html, css } from 'lit-element';

class EspeCard extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      image: { type: String },
      rating: { type: Number },
      sales: { type: Number },
      lowstock: { type: Boolean, reflect: true },
      offer: { type: Number },
      sku: { type: String },
      currentPrice: { type: Number },
      originalPrice: { type: Number },
      hasDiscount: { type: Boolean },
      quantity: { type: Number },
      isFavorite: { type: Boolean },
      theme: { type: String, reflect: true }
    };
  }

  constructor() {
    super();
    this.name = 'Producto sin nombre';
    this.image = '';
    this.rating = 0;
    this.sales = 0;
    this.lowstock = false;
    this.offer = 0;
    this.sku = '';
    this.currentPrice = 0;
    this.originalPrice = 0;
    this.hasDiscount = false;
    this.quantity = 0;
    this.isFavorite = false;
    this.theme = 'light';
  }

  static styles = css`
    :host {
      --color-primario: #006935;
      --color-secundario: #FFE700;
      --color-peligro: #DF0303;
      --bg-claro: #ffffff;
      --bg-oscuro: #1f2937;
      --text-claro: #000000;
      --text-oscuro: #ffffff;
      --font: 'Arial', 'Roboto', sans-serif;

      display: block;
      font-family: var(--font);
      background-color: var(--bg-claro);
      color: var(--text-claro);
    }

    :host([theme="dark"]) {
      background-color: var(--bg-oscuro);
      color: var(--text-oscuro);
    }

    .card {
      display: flex;
      flex-direction: row;
      border: 1px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
      max-width: 500px;
      background: inherit;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transform: scale(1.02);
    }

    .image-container {
      width: 200px;
      position: relative;
    }

    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .favorite-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: white;
      border: 1px solid #ccc;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .content {
      padding: 16px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    h3 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: bold;
    }

    .details, .price-line {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 0.9rem;
    }

    .lowstock {
      color: orange;
      font-weight: bold;
    }

    .discount {
      color: var(--color-peligro);
    }

    .original {
      text-decoration: line-through;
    }

    .badge {
      background: var(--color-peligro);
      color: white;
      font-size: 0.75rem;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .buttons {
      display: flex;
      gap: 8px;
      margin-top: 8px;
    }

    .add-button,
    .qty-btn {
    background: var(--color-primario);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 12px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
    }

    .add-button:hover {
    background: #004d26; /* un verde más oscuro */
    }

    .qty-btn:hover {
    background: #004d26;
    }


    .quant {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 6px;
      width: 40px;
      text-align: center;
    }

    @media (max-width: 600px) {
      .card {
        flex-direction: column;
      }

      .image-container {
        width: 100%;
        aspect-ratio: 1 / 1;
      }
    }
  `;

  render() {
    return html`
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <div class="card">
        <div class="image-container">
          <img src="${this.image}" alt="${this.name}" />
          <button class="favorite-btn" @click="${this._toggleFavorite}">
            <span class="material-icons">${this.isFavorite ? 'bookmark' : 'bookmark_border'}</span>
          </button>
        </div>
        <div class="content">
          <h3>${this.name}</h3>
          <div class="details">
            ${this.rating ? html`<span>★ ${this.rating}</span>` : ''}
            ${this.sales ? html`<span>+${this.sales} ventas</span>` : ''}
            ${this.lowstock ? html`<span class="lowstock">POCAS UNIDADES</span>` : ''}
          </div>
          <div class="price-line">
            <span class="${this.hasDiscount ? 'discount' : ''}">$${this.currentPrice.toFixed(2)}</span>
            ${this.hasDiscount ? html`
              <span class="original">$${this.originalPrice.toFixed(2)}</span>
              <span class="badge">-${this.offer}%</span>
            ` : ''}
            <span>COD: ${this.sku}</span>
          </div>
          ${this.quantity === 0 ? html`
            <button class="add-button" @click="${this._addToCart}">
              Agregar <span class="material-icons">add_shopping_cart</span>
            </button>
          ` : html`
            <div class="buttons">
              <button class="qty-btn" @click="${this._decrement}">-</button>
              <span class="quant">${this.quantity}</span>
              <button class="qty-btn" @click="${this._increment}">+</button>
            </div>
          `}
        </div>
      </div>
    `;
  }

  _toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.dispatchEvent(new CustomEvent('favorite-toggle', {
      detail: { isFavorite: this.isFavorite }
    }));
  }

  _addToCart() {
    this.quantity = 1;
    this.dispatchEvent(new CustomEvent('add-to-cart'));
  }

  _increment() {
    this.quantity++;
    this.dispatchEvent(new CustomEvent('quantity-change', { detail: this.quantity }));
  }

  _decrement() {
    if (this.quantity > 0) {
      this.quantity--;
      this.dispatchEvent(new CustomEvent('quantity-change', { detail: this.quantity }));
    }
  }
}

customElements.define('espe-card', EspeCard);
