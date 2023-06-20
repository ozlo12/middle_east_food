import CheckIcon from "@icons/Check";
import Image from "next/image";
import shawrmaImage from "../../../../public/shawerma.jpg";
export default function Meal({ params }: { params: { slug: string } }) {
  return (
    <>
      <div className="card d-block d-md-none m-3 bg-secondary-subtle">
        <Image src={shawrmaImage} className="card-img-top" height={400} alt="..." />
        <div className="card-body bg-secondary-subtle">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <div className="bg-secondary-subtle ps-3">
          <p>item1</p>
          <p>item1</p>
          <p>item1</p>
        </div>
        <div className="text-center fw-semibold fs-5">Price $23</div>
        <div className="card-body bg-secondary-subtle text-center">
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>

      <div className="d-none d-md-flex container rounded">
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
