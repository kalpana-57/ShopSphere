
import { Heart, ShoppingCart, Star } from "lucide-react";

function ProductCard({
  product,
  onAdd,
  onToggleWishlist,
  isWishlisted,
}) {
  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <span className="product-badge">{product.badge}</span>

        <button
          className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={() => onToggleWishlist(product.id)}
          aria-label="Toggle wishlist"
        >
          <Heart
            size={19}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>

        <h3>{product.name}</h3>

        <div className="product-rating">
          <Star size={15} fill="#f5a623" color="#f5a623" />
          <span>{product.rating}</span>
        </div>

        <div className="product-bottom">
          <div className="product-prices">
            <strong>₹{product.price.toLocaleString("en-IN")}</strong>
            <del>₹{product.oldPrice.toLocaleString("en-IN")}</del>
          </div>

          <button
            className="add-cart-btn"
            onClick={() => onAdd(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
