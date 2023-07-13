import Link from "next/link";
import classes from "./Header.module.scss";
import Search from "../search/Search";
import { MealDoc } from "@/models/Meal";
import EmailDropdown from "../EmailDropdown";

export default function Header({ meals }: { meals: MealDoc[] }) {
  return (
    <header>
      <div className="text-center mb-3 position-relative mx-auto">
        <h1 className={classes.title}>Middle Eastern Food</h1>
        <EmailDropdown />
      </div>
      <Search products={meals.map((m) => ({ title: m.name, id: m.id! }))} />
    </header>
  );
}
