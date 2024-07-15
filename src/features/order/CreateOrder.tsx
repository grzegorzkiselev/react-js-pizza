import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { Button } from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true"
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone = (
      "Please give up your correct phone number."
    );
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
};

function CreateOrder() {
  const dispatch = useDispatch();
  const navigatoin = useNavigation();
  const [withPriority, setWithPriority] = useState(false);
  const isSubmiting = navigatoin.state === "submitting";
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError
  } = useSelector((state) => state.user);
  const isAddressLoading = addressStatus === "loading";
  const formData = useActionData();
  const priorityPrice = withPriority ? totalCartPrice * .2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let’s go!</h2>
      <Form method="POST" action="/order/new">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" defaultValue={username} type="text" name="customer" required />
        </div>
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formData?.phone && <p className="mt-2 text-xs text-red-700 bg-red-100 p-2 rounded-md">{formData.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full" type="text" name="address" required disabled={isAddressLoading} defaultValue={address} />
            {addressStatus === "error" && <p className="mt-2 text-xs text-red-700 bg-red-100 p-2 rounded-md">{ }</p>}
          </div>
          <span className="absolute right-[8px] z-1">
            <Button style="small" onClick={() => dispatch(fetchAddress())}>Get position</Button>
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            value={String(withPriority)}
            onChange={(event) => {
              setWithPriority(event.target.checked);
            }}
          />
          <label className="font-medium" htmlFor="priority">Want to you give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.latitude},${position.longitude}` : ""} />
          <Button type="submit" disabled={isSubmiting} style="primary">
            {isSubmiting
              ? "Placing order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
