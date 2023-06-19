import CheckIcon from "@icons/Check";
import Image from "next/image";
import shawrmaImage from "../../../../public/shawerma.jpg";
export default function Meal({ params }: { params: { slug: string } }) {
  return (
    <>
      <div className="d-flex container rounded">
        <Image
          className="img-fluid rounded-start-4 w-100"
          src={shawrmaImage}
          alt={"meal"}
        />
        <div className="bg-secondary-subtle rounded-end-4 w-100 text-center">
          <h2 className="text-primary-emphasis p-4">Meal Name</h2>
          <ul className="list-group list-group-horizontal ">
            <li className="list-group-item bg-transparent border-0 mx-auto">
              <span className="me-2">
                <CheckIcon className="text-primary-emphasis" />
              </span>
              <span>Vegan</span>
            </li>
            <li className="list-group-item bg-transparent border-0 mx-auto">
              <span className="me-2">
                <CheckIcon className="text-primary-emphasis" />
              </span>
              <span>Syrian</span>
            </li>
          </ul>
          <h3 className="text-secondary-emphasis">Description</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel
            commodi deserunt et sed ducimus. Nobis dolor harum inventore alias
            vitae consectetur iure temporibus corrupti ducimus similique eius
          </p>
          <p className="fs-2 ">$32</p>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
      <div style={{ height: "3rem" }}></div>
    </>
  );
}
