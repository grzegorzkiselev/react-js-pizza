import { useDispatch } from "react-redux";
import { Button } from "../../ui/Button";
import { deleteItem } from "./cartSlice";

export const DeleteItem = ({ pizzaId }) => {
  const dispatch = useDispatch();

  return <Button onClick={() => dispatch(deleteItem(pizzaId))} style="small">Delete</Button>;
};