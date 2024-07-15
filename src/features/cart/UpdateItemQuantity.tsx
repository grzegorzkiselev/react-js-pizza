import { useDispatch } from "react-redux";
import { Button } from "../../ui/Button";
import { increaseItemQuantity, decreaseItemQuantity } from "./cartSlice";

export const UpdateItemQuantity = ({ pizzaId, currentQuantity }) => {
  const dispatch = useDispatch();

  return <div className="flex items-center gap-2 md:gap-3">
    <Button onClick={() => dispatch(decreaseItemQuantity(pizzaId))} style="round">−</Button>
    <span className="text-sm font-medium">{currentQuantity}</span>
    <Button onClick={() => dispatch(increaseItemQuantity(pizzaId))} style="round">+</Button>
  </div>;
};