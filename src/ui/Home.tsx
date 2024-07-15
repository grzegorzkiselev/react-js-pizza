import { FC } from "react";
import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import { Button } from "./Button";

export const Home: FC<HTMLDivElement> = () => {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="my-10 text-center sm:my-16 px-4">
      <h1 className="text-xl text-yellow-500 font-semibold mb-8 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">Straight out of the oven, straight to you.</span>
      </h1>
      {username ? <Button to="/menu" style="primary">Continue ordering, {username}</Button> : <CreateUser />}
    </div>
  );
};

export default Home;
