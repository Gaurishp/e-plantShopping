
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "./CartSlice";

const plants = [
  {
    id: 1,
    name: "Snake Plant",
    category: "Air Purifying Plants",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1593482892290-f54927ae2b36?auto=format&fit=crop&w=500&q=80",
    description: "A hardy plant that adds natural beauty to your home.",
  },
  {
    id: 2,
    name: "Spider Plant",
    category: "Air Purifying Plants",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=500&q=80",
    description: "An easy-care plant for bright indoor spaces.",
  },
  {
    id: 3,
    name: "Peace Lily",
    category: "Air Purifying Plants",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=500&q=80",
    description: "Elegant foliage with beautiful white blooms.",
  },
  {
    id: 4,
    name: "Aloe Vera",
    category: "Succulents",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=500&q=80",
    description: "A low-maintenance succulent for sunny spaces.",
  },
  {
    id: 5,
    name: "Echeveria",
    category: "Succulents",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=500&q=80",
    description: "A compact succulent with a beautiful rosette.",
  },
  {
    id: 6,
    name: "Jade Plant",
    category: "Succulents",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80",
    description: "A charming succulent with thick green leaves.",
  },
  {
    id: 7,
    name: "Boston Fern",
    category: "Hanging Plants",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=500&q=80",
    description: "Feathery foliage that brings a lush look indoors.",
  },
  {
    id: 8,
    name: "English Ivy",
    category: "Hanging Plants",
    price: 13,
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=500&q=80",
    description: "Trailing green foliage for shelves and hanging pots.",
  },
  {
    id: 9,
    name: "Golden Pothos",
    category: "Hanging Plants",
    price: 17,
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=500&q=80",
    description: "A popular trailing plant with attractive green leaves.",
  },
];

function Header({ view, setView, cartCount }) {
  return (
    <header className="navbar">
      <button
        className="brand"
        onClick={() => setView("home")}
        aria-label="Go to home page"
      >
        <span className="brand-icon">🌱</span>
        <span>
          <strong>Paradise Nursery</strong>
          <small>Where Green Meets Serenity</small>
        </span>
      </button>

      <nav>
        <button
          className={view === "plants" ? "nav-link active" : "nav-link"}
          onClick={() => setView("plants")}
        >
          Plants
        </button>

        <button
          className="cart-link"
          onClick={() => setView("cart")}
          aria-label={`Shopping cart with ${cartCount} items`}
        >
          <span className="cart-symbol">🛒</span>
          <span className="cart-count">{cartCount}</span>
        </button>
      </nav>
    </header>
  );
}

function LandingPage({ onGetStarted }) {
  return (
    <main className="landing-page">
      <div className="landing-overlay" />

      <section className="landing-intro">
        <h1>Welcome To<br />Paradise Nursery</h1>
        <span className="green-line" />
        <p>Where Green Meets Serenity</p>
        <button className="primary-button" onClick={onGetStarted}>
          Get Started
        </button>
      </section>

      <section className="landing-description">
        <p className="welcome-caption">
          Welcome to Paradise Nursery, where green meets serenity!
        </p>

        <p>
          At Paradise Nursery, we are passionate about bringing nature
          closer to you. Our mission is to provide a wide range of
          high-quality plants that not only enhance the beauty of your
          surroundings but also contribute to a healthier and more
          sustainable lifestyle. From air-purifying plants to aromatic
          fragrant ones, we have something for every plant enthusiast.
        </p>

        <p>
          Our team of experts is dedicated to ensuring that each plant
          meets our strict standards of quality and care. Whether you
          are a seasoned gardener or just starting your green journey,
          we are here to support you every step of the way.
        </p>

        <p>
          Join us in our mission to create a greener, healthier world.
          Visit Paradise Nursery today and experience the beauty of
          nature right at your doorstep.
        </p>
      </section>
    </main>
  );
}

function ProductListing({ cart, onAdd }) {
  const categories = [...new Set(plants.map((plant) => plant.category))];

  return (
    <main className="products-page">
      <div className="page-heading">
        <h1>Our Plants</h1>
        <p>Bring home a little more green.</p>
      </div>

      {categories.map((category) => (
        <section className="plant-category" key={category}>
          <h2>{category}</h2>

          <div className="plant-grid">
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => {
                const added = cart.some((item) => item.id === plant.id);

                return (
                  <article className="plant-card" key={plant.id}>
                    <img
                      className="plant-image"
                      src={plant.image}
                      alt={plant.name}
                      loading="lazy"
                    />

                    <div className="plant-details">
                      <h3>{plant.name}</h3>
                      <p className="plant-description">
                        {plant.description}
                      </p>
                      <p className="plant-price">
                        ${plant.price.toFixed(2)}
                      </p>

                      <button
                        className={added ? "primary-button added" : "primary-button"}
                        onClick={() => onAdd(plant)}
                        disabled={added}
                      >
                        {added ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </article>
                );
              })}
          </div>
        </section>
      ))}
    </main>
  );
}

function ShoppingCart({ cart, setView }) {
  const dispatch = useDispatch();

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <h1>Your Shopping Cart</h1>

      <h2 className="cart-summary">
        Total Plants: {totalItems}
      </h2>

      <h2 className="cart-summary">
        Total Cart Amount: ${totalPrice.toFixed(2)}
      </h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-icon">🪴</span>
          <h2>Your cart is empty</h2>
          <p>Discover your next favorite plant.</p>
          <button
            className="primary-button"
            onClick={() => setView("plants")}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.price.toFixed(2)}</p>

                <div className="quantity-controls">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>

                <p className="item-total">
                  Item Total: ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  className="delete-button"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="cart-actions">
        <button
          className="primary-button"
          onClick={() => setView("plants")}
        >
          Continue Shopping
        </button>

        <button
          className="primary-button checkout-button"
          onClick={() => window.alert("Checkout Coming Soon!")}
        >
          Checkout
        </button>
      </div>
    </main>
  );
}

export default function App() {
  const [view, setView] = useState("home");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleAdd = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div className="app">
      {view !== "home" && (
        <Header
          view={view}
          setView={setView}
          cartCount={cartCount}
        />
      )}

      {view === "home" && (
        <LandingPage onGetStarted={() => setView("plants")} />
      )}

      {view === "plants" && (
        <ProductListing cart={cart} onAdd={handleAdd} />
      )}

      {view === "cart" && (
        <ShoppingCart cart={cart} setView={setView} />
      )}
    </div>
  );
}
