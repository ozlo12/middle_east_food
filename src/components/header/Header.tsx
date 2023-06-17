import Link from "next/link";
import classes from "./Header.module.scss";
import Search from "../search/Search";

export default function Header() {
  return (
    <header>
      <h1 className={classes.title}>Middle Estern Food</h1>
      <Search products={[]} />
    </header>
  );
}
