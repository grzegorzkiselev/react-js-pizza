import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";

export const orderLoader = async ({ params }) => {
  return (await getOrder(params.orderId));
};

export const SearchOrder = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target!.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!query) {
      return;
    }
    navigate(`/order/${query}`);
    setQuery("");
  };

  return <form onSubmit={handleSubmit} action="">
    <input className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm placeholder:text-stone-400 sm:focus:w-72 sm:w-64 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 focus:ring-offset-2" type="text" value={query} onChange={onInput} placeholder="Search order #" />
  </form>;
};