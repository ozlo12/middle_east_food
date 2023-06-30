import MealsReport from "@/components/meals/MealsReport";
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
        <Link
          className="btn h-100 w-100 p-4 d-flex flex-column justify-content-center"
          href={route}
        >
          {children}
        </Link>
      </div>
    </div>
  );
}
export default async function Dashboard() {
  return (
    <div className="vh-100 container">
      <h2 className="text-center mb-4 text-white fw-semibold">Dashboard</h2>
      <div className="row  h-75 g-4 ">
        <DashboardItem route="/admin/meals">
          <MealsReport />
        </DashboardItem>
        <DashboardItem route="/admin/orders">
          <h3>Orders</h3>
          <h5>Total orders: 230</h5>
          <h6>Active orders: 2</h6>
        </DashboardItem>
      </div>
    </div>
  );
}
