import { mealModel } from "@/container/ClientContainer";
import { MealDoc } from "@/models/Meal";
import Link from "next/link";
import { ReactNode } from "react";

function DashboardItem({
  children,
  route,
}: {
  children: ReactNode;
  route: string;
}) {
  return (
    <div className="col-md-6">
      <div className="bg-white rounded h-100 text-center">
        <Link className="btn h-100 w-100 p-4" href={route}>
          {children}
        </Link>
      </div>
    </div>
  );
}
// const dashboardFetcher = async <T = any,>(docName: string) => {
//   return fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/" + docName, {
//     cache: "no-store",
//   }).then((res) => res.json()) as Promise<T>;
// };
export default async function Dashboard() {
  // const { meals } = await dashboardFetcher<{ meals: MealDoc[] }>("meals");
  const meals = [];

  return (
    <div className="vh-100 container">
      <h2 className="text-center mb-4 text-white fw-semibold">Dashboard</h2>
      <div className="row  h-75 g-4 ">
        <DashboardItem route="/admin/meals">
          <h3>Meals</h3>
          <h5>{meals.length} Avaialble meals</h5>
        </DashboardItem>
        <DashboardItem route="/admin/orders">
          <h3>Orders</h3>
          <h5>Total orders: 230</h5>
          <h6>Active orders: 2</h6>
        </DashboardItem>
        <DashboardItem route="/admin/users">
          <h3>Users</h3>
          <h5>Total users: 30</h5>
        </DashboardItem>
      </div>
    </div>
  );
}
