import { Link } from "react-router-dom";

export const Button = ({ children, onClick, to = "", type = "button", style = "primary", disabled = false }) => {

  const primaryBase = ` text-sm bg-yellow-400 uppercase font-semibold text-stone-800 inline-block rounded-full tracking-wide hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:bg-yellow-300 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed `;
  const secondaryBase = ` text-sm border-2 border-stone-300 uppercase font-semibold text-stone-400 inline-block rounded-full tracking-wide hover:bg-stone-300 hover:text-stone-400 focus:text-stone-400 transition-colors duration-300 focus:outline-none focus:ring focus:bg-stone-300 focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed`;

  const styles = {
    primary: primaryBase + " px-4 py-3 md:px-6 md:py-4",
    small: primaryBase + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary: secondaryBase + " px-4 py-2.5 md:px-6 md:py-3.5",
    round: primaryBase + "px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
  };

  if (to) {
    return (
      <Link to={to} className={styles[style]}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return <button type={type} onClick={onClick} className={styles[style]} disabled={disabled}>{children}</button>;
  }

  return <button type={type} className={styles[style]} disabled={disabled}>{children}</button>;
};