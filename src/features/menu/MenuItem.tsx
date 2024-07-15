import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getItemQuantityById } from "../cart/cartSlice";
import { DeleteItem } from "../cart/DeleteItem";
import { UpdateItemQuantity } from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getItemQuantityById(id));

  const handleAddToCart = ({ id, name, unitPrice }) => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name}
        className={`h-24 ${soldOut && "opacity-70 grayscale"}`}
      />
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-sm font-medium uppercase ">
            {!soldOut ? `${formatCurrency(unitPrice)}` : "Sold out"}
          </p>
          {
            !soldOut &&
            (currentQuantity
              ? <div className="flex gap-3 sm:gap-8"><UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity} /> <DeleteItem pizzaId={id} /></div>
              : <Button onClick={() => handleAddToCart(pizza)} style="small">Add to cart</Button>)
          }
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
