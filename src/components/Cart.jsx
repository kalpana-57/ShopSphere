
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
} from "lucide-react";

function Cart({
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemove,
}) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal === 0 || subtotal >= 2999 ? 0 : 99;
  const total = subtotal + delivery;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-header">
          <div>
            <h2>Your Shopping Cart</h2>
            <p>
              {cartItems.length} different products
            </p>
          </div>

          <button
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={55} />
            <h3>Your cart is empty</h3>
            <p>Add something you love!</p>

            <button
              className="continue-shopping-btn"
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />

                  <div className="cart-item-details">
                    <h3>{item.name}</h3>

                    <strong>
                      ₹{item.price.toLocaleString("en-IN")}
                    </strong>

                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        className="remove-item-btn"
                        onClick={() => onRemove(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <strong>
                  ₹{subtotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="cart-summary-row">
                <span>Delivery</span>
                <strong>
                  {delivery === 0
                    ? "FREE"
                    : `₹${delivery}`}
                </strong>
              </div>

              <div className="cart-summary-row cart-total">
                <span>Total</span>
                <strong>
                  ₹{total.toLocaleString("en-IN")}
                </strong>
              </div>

              <p className="delivery-message">
                {subtotal >= 2999
                  ? "You've unlocked free delivery!"
                  : `Add ₹${(
                      2999 - subtotal
                    ).toLocaleString("en-IN")} more for free delivery.`}
              </p>

              <button
                className="checkout-btn"
                onClick={() =>
                  alert("Checkout is a demo feature!")
                }
              >
                <ShoppingCart size={18} />
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default Cart;
