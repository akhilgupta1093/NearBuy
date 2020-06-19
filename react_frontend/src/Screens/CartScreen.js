import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';

function CartScreen (props) {
  const cart = useSelector(state => state.cart);

  const { cartItems } = cart

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping")
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
    return () => {

    }
  }, [dispatch, productId, qty])

  return <div className="cart">
    <div className="cart-list">
      <ul className="cart-list-container">
        <li>
          <h3>
            Shopping Cart
          </h3>
          <div>
            Price
          </div>
        </li>
        {
          cartItems.length === 0 ? <div>Cart is empty</div> :
            cartItems.map(item =>
              <li key={item.product}>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>
                      {item.name}
                    </Link>
                  </div>
                  <div>
                    Qty:
                    <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                      {[...Array(item.countInStock).keys()].map(x =>
                        <option value={x + 1}>{x + 1}</option>
                      )}
                    </select>
                    <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)}>
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">
                  ${item.price}
                </div>
              </li>
            )
        }
      </ul>
    </div>
    <div className="cart-action">
      <h3>
        Subtotal ( {cartItems.reduce((acc, curr) => Number(acc) + Number(curr.qty), 0)} items)
          : ${cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0)}
      </h3>
      <button className="button primary full-width" onClick={checkoutHandler} disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>
    </div>
  </div>
}

export default CartScreen;
