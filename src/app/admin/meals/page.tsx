import EditIcon from "@/icons/Edit";
import { MealDoc } from "@/models/Meal";
import Image from "next/image";
import Link from "next/link";

// const dashboardFetcher = async <T = any,>(docName: string) => {
//   return fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/" + docName, {
//     cache: "no-store",
//   }).then((res) => res.json()) as Promise<T>;
// };

export default async function Meals() {
  // const { meals } = await dashboardFetcher<{ meals: MealDoc[] }>("meals");
  const meals: MealDoc[] = [];

  return (
    <div className="vh-100">
      <div className="container my-4 rounded p-5 bg-primary-subtle mh-100 overflow-auto position-relative">
        <div className="position-absolute top-0 end-0 p-2">
          <Link href="/admin/meals/new" className="btn btn-primary">
            New
          </Link>
        </div>
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">edit</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((m, i) => (
              <tr className="p-4">
                <th scope="row">{i + 1}</th>
                <td>
                  <div className="d-flex gap-2 align-items-center">
                    <Image src={m.image} height={40} width={40} alt={m.name} />
                    <span>{m.name}</span>
                  </div>
                </td>
                <td>{m.price}</td>
                <td>
                  <Link href={`/admin/meals/${m.id}`}>
                    <EditIcon className="text-secondary-emphasis" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
