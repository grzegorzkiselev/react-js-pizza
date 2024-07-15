import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../ui/Button";
import { LinkButton } from "../../ui/LinkButton";
import { getUsername } from "../user/userSlice";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { clearCart, getCart } from "./cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const username = useSelector(getUsername);
  const cart = useSelector(getCart);

  if (!cart.length) {
    return <EmptyCart />;
  }

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="py-3 px-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="divide-y divide-sone-200 border-b">
        {cart.map((item) => <CartItem item={item} key={item.pizzaId} />)}
      </ul>
      <div className="mt-6 space-x-2">
        <Button to="/order/new">Order pizzas</Button>
        <Button style="secondary" onClick={handleClearCart}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
