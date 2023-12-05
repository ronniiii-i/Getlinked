const Cart = ({ cart, setCart, showCart, setShowCart, deleteItem }) => {
  const updateItemCount = (itemId, newCount) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, count: newCount } : item
    );
    return updatedCart;
  };

  const increaseCount = (itemId) => {
    setCart(
      updateItemCount(itemId, cart.find((item) => item.id === itemId).count + 1)
    );
  };

  const decreaseCount = (itemId) => {
    const currentItem = cart.find((item) => item.id === itemId);
    if (currentItem.count === 1) {
      // If count is 1, remove the item from the cart
      deleteItem(itemId);
    } else {
      // Otherwise, decrease the count
      setCart(updateItemCount(itemId, currentItem.count - 1));
    }
  };

  return (
    <section
      id="cart"
      className={`flex column justify-between ${showCart ? "open" : ""}`}
    >
      <div className="flex align-center justify-between">
        <h3>Cart</h3>
        <button
          className="del flex align-center justify-center"
          onClick={() => {
            setShowCart(false);
          }}
        >
          ╳
        </button>
      </div>
      <ul>
        {cart.length ? (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="flex align-center justify-between mar-1">
                <h4>{item.title}</h4>
                <button
                  className="del flex align-center justify-center"
                  onClick={() => deleteItem(item.id)}
                >
                  ╳
                </button>
              </div>
              <p className="mar-1">
                {(item.discountPrice * item.count).toFixed(2)}
              </p>
              <div className="count flex align-center mar-1">
                <button onClick={() => decreaseCount(item.id)}>-</button>
                <input type="number" value={item.count} readOnly />
                <button onClick={() => increaseCount(item.id)}>+</button>
              </div>
            </div>
          ))
        ) : (
          <h4 className="flex align-center justify-center">
            <i>There is nothing in your cart</i>
          </h4>
        )}
      </ul>
      <div className="total">
        Total: $
        {cart
          .reduce(function (accumulator, currentValue) {
            const itemTotal =
              accumulator +
              parseFloat(currentValue.discountPrice * currentValue.count);
            return itemTotal;
          }, 0)
          .toFixed(2)}
      </div>
    </section>
  );
};

export default Cart;
