import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getCartItemsQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const cartCount = useSelector(getCartItemsQuantity);
  const cartPrice = useSelector(getTotalCartPrice);

  if (cartCount == false) {
    return "";
  }

  return (
    <div className="flex items-center justify-between bg-stone-800 text-stone-200 uppercase p-4">
      <p className="text-stone-300 font-semibold space-x-4 sm:px-6 text-sm md:text-base">
        <span>{cartCount} pizzas</span>
        <span>{formatCurrency(cartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
