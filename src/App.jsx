
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  Heart,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";

import Navbar from "./components/navbar";
import ProductCard from "./components/productcard";
import Cart from "./components/cart";
import products from "./data/products";

import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopsphere-cart")) || [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopsphere-wishlist")) || [];
    } catch {
      return [];
    }
  });

  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  const categories = ["All", "Fashion", "Electronics", "Accessories"];

  useEffect(() => {
    localStorage.setItem("shopsphere-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("shopsphere-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category.trim().toLowerCase() ===
          selectedCategory.toLowerCase();

      const matchesWishlist =
        !showWishlist || wishlist.includes(product.id);

      return matchesSearch && matchesCategory && matchesWishlist;
    });
  }, [searchValue, selectedCategory, showWishlist, wishlist]);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const toggleWishlist = (id) => {
    setWishlist((currentWishlist) =>
      currentWishlist.includes(id)
        ? currentWishlist.filter((itemId) => itemId !== id)
        : [...currentWishlist, id]
    );
  };

  const openWishlist = () => {
    setShowWishlist(true);
    setSelectedCategory("All");
    setSearchValue("");

    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const showAllProducts = () => {
    setShowWishlist(false);
    setSelectedCategory("All");
    setSearchValue("");
  };

  return (
    <div className="app">
      <div className="announcement-bar">
        <p>
          <span>FREE SHIPPING</span> on orders above ₹2,999
        </p>
      </div>

      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onCartClick={() => setShowCart(true)}
        onWishlistClick={openWishlist}
        searchValue={searchValue}
        onSearchChange={(value) => {
          setSearchValue(value);
          setShowWishlist(false);
        }}
      />

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-tag">
              YOUR STYLE, YOUR CHOICE
            </span>

            <h1>
              Discover products
              <br />
              you'll <span>love.</span>
            </h1>

            <p>
              Explore everyday essentials, trending styles, and
              products made to make your life better.
            </p>

            <button
              className="hero-button"
              onClick={() =>
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Explore Collection <ArrowRight size={18} />
            </button>

            <div className="hero-trust">
              <div>
                <CheckCircle size={16} /> Quality products
              </div>
              <div>
                <CheckCircle size={16} /> Easy shopping
              </div>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
              alt="Modern fashion and lifestyle store"
            />

            <div className="hero-floating-card">
              <span>✨ Trending now</span>
              <strong>Find your next favorite</strong>
            </div>
          </div>
        </section>

        <section className="benefits-section">
          <div className="benefit-item">
            <Truck size={25} />
            <div>
              <strong>Free Delivery</strong>
              <span>On orders above ₹2,999</span>
            </div>
          </div>

          <div className="benefit-item">
            <ShieldCheck size={25} />
            <div>
              <strong>Secure Shopping</strong>
              <span>Your shopping experience matters</span>
            </div>
          </div>

          <div className="benefit-item">
            <Package size={25} />
            <div>
              <strong>Easy Returns</strong>
              <span>Simple return experience</span>
            </div>
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">OUR COLLECTION</span>

              <h2>
                {showWishlist ? "Your Wishlist" : "Featured Products"}
              </h2>

              <p>
                {showWishlist
                  ? "Your saved favorite products."
                  : "Handpicked products just for you."}
              </p>
            </div>

            <button
              className="view-all-btn"
              onClick={showAllProducts}
            >
              View all <ArrowUpRight size={17} />
            </button>
          </div>

          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${
                  selectedCategory === category ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowWishlist(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="product-count">
            Showing {filteredProducts.length} products
            {showWishlist && <span> · Saved items</span>}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.includes(product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-products">
              <Heart size={40} />

              <h3>
                {showWishlist
                  ? "Your wishlist is empty"
                  : "No products found"}
              </h3>

              <p>
                {showWishlist
                  ? "Save products you love by clicking the heart icon."
                  : "Try another search or category."}
              </p>

              <button onClick={showAllProducts}>
                Explore products
              </button>
            </div>
          )}
        </section>

        <section className="newsletter-section">
          <div>
            <span>STAY IN THE LOOP</span>
            <h2>Good things are coming.</h2>
            <p>
              Keep exploring and discover something you love.
            </p>
          </div>

          <button
            onClick={() =>
              document.getElementById("products")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Shop now <ArrowRight size={18} />
          </button>
        </section>
      </main>

      <footer className="footer">
        <a href="#" className="footer-logo">
          Shop<span>Sphere</span>
        </a>

        <p>Making everyday shopping a little more special.</p>

        <span>© 2026 ShopSphere. Portfolio demo project.</span>
      </footer>

      {showCart && (
        <Cart
          cartItems={cartItems}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
      )}
    </div>
  );
}

export default App;
