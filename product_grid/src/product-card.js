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
            --primary-color: #003c71;
            --accent-color: #fca311;
            --danger-color: #df0303;
            --lowstock-color: #ffa500;
            --font-family: 'Arial', sans-serif;

            display: block;
            font-family: var(--font-family);
            color: var(--text-color, #000);
        }

        :host([theme="dark"]) {
            --bg-color: #1f2937;
            --text-color: #e5e7eb;
        }

        .card {
            display: flex;
            flex-direction: row;
            background: var(--bg-color, white);
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            overflow: hidden;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            max-width: 450px;
            width: 100%;
        }

        .card:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .image-container {
            flex: 1;
            position: relative;
            min-width: 200px;
        }

        .image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .favorite-btn {
            position: absolute;
            top: 0;
            right: 0.75rem;
            width: 2.25rem;
            height: 2.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0 0 9999px 9999px;
            border: 1px solid #ccc;
            background: white;
            cursor: pointer;
        }

        .favorite-btn.selected {
            background: #e3f2fd;
        }

        .content {
            flex: 2;
            padding: 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 0.5rem;
        }

        h3 {
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0;
        }

        .details,
        .price-line {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.25rem;
            font-size: 0.95rem;
        }

        .lowstock {
            color: var(--lowstock-color);
            font-size: 0.8rem;
            font-weight: bold;
        }

        .discount {
            color: #f97316;
        }

        .original {
            text-decoration: line-through;
        }

        .badge {
            font-size: 0.8rem;
            font-weight: bold;
            padding: 0 4px;
            border: 1px solid #f97316;
            color: #f97316;
            border-radius: 2px;
        }

        .buttons {
            display: flex;
            gap: 0.5rem;
            align-items: center;
            justify-content: center;
        }

        .add-button,
        .qty-btn {
            background: var(--accent-color);
            border: none;
            border-radius: 0.5rem;
            padding: 0.25rem 0.5rem;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
        }

        .qty-btn {
            color: #fff;
            background: #000;
        }

        .quant{
            width: 100%;
            padding: 0.43rem;
            text-align: center;
            font-weight: bold;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            font-size: 18px;
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
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <div class="card">
                <div class="image-container">
                    <img src="${this.image}" alt="${this.name}" />
                    <button class="favorite-btn ${this.isFavorite ? 'selected' : ''}" @click="${this._toggleFavorite}">
                        <span class="material-icons" style="color: ${this.isFavorite ? '#003c71' : '#6b7280'}">
                            ${this.isFavorite ? 'bookmark' : 'bookmark_border'}
                        </span>
                    </button>
                </div>

                <div class="content">
                    <div>
                        <h3>${this.name}</h3>
                        <div class="details">
                            ${this.rating > 0 ? html`<span>★ ${this.rating}</span>` : ''}
                            ${this.sales > 0 ? html`<span>+${this.sales} ventas</span>` : ''}
                            ${this.lowstock ? html`<span class="lowstock">POCAS UNIDADES</span>` : ''}
                        </div>

                        <div class="price-line">
                            <span class="${this.hasDiscount ? 'discount' : 'text-danger'}">
                                $${this.currentPrice.toFixed(2)}
                            </span>
                            ${this.hasDiscount
                                ? html`
                                    <span class="original">$${this.originalPrice.toFixed(2)}</span>
                                    <span class="badge">-${this.offer}%</span>
                                  `
                                : ''}
                            <span>COD: ${this.sku}</span>
                        </div>
                    </div>

                    ${this.quantity === 0
                        ? html`
                            <button class="add-button" @click="${this._addToCart}">
                                <div class="buttons">
                                    Agregar
                                    <span class="material-icons">add_shopping_cart</span>
                                </div>
                            </button>
                          `
                        : html`
                            <div class="buttons">
                                <button class="qty-btn" @click="${this._decrement}">
                                    <span class="material-icons">remove</span>
                                </button>
                                <span class="quant">${this.quantity}</span>
                                <button class="qty-btn" @click="${this._increment}">
                                    <span class="material-icons">add</span>
                                </button>
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