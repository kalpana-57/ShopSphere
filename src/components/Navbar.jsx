
import {
  ShoppingBag,
  ShoppingCart,
  Heart,
  Search,
} from "lucide-react";

function Navbar({
  cartCount,
  wishlistCount,
  onCartClick,
  onWishlistClick,
  searchValue,
  onSearchChange,
}) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="#" className="brand-logo">
          <span className="brand-icon">
            <ShoppingBag size={23} />
          </span>
          <span>Shop<span className="brand-highlight">Sphere</span></span>
        </a>

        <div className="navbar-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="navbar-actions">
          <button
            className="nav-icon-btn"
            onClick={onWishlistClick}
            aria-label="View wishlist"
          >
            <Heart size={21} />
            {wishlistCount > 0 && (
              <span className="nav-count">{wishlistCount}</span>
            )}
          </button>

          <button
            className="nav-icon-btn cart-nav-btn"
            onClick={onCartClick}
            aria-label="View shopping cart"
          >
            <ShoppingCart size={21} />
            {cartCount > 0 && (
              <span className="nav-count">{cartCount}</span>
            )}
            <span className="cart-label">Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
