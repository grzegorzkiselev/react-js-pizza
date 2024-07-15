import { useSelector } from "react-redux";

export const Username = () => {
  const username = useSelector((state) => state.user.username);

  if (!username) {
    return "";
  }

  return <p className="hidden text-sm font-semibold md:block">{username}</p>;
};