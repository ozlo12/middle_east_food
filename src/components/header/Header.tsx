import Link from "next/link";
import classes from "./Header.module.scss";
import Search from "../search/Search";
import { MealDoc } from "@/models/Meal";

export default function Header({ meals }: { meals: MealDoc[] }) {
  return (
    <header>
      <h1 className={classes.title}>Middle Estern Food</h1>
      <Search products={meals.map((m) => ({ title: m.name, id: m.id! }))} />
    </header>
  );
}
