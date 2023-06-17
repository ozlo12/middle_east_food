import AvatarIcon from "../../icons/Avatar";
import CartIcon from "../../icons/Cart";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar bg-transparent">
      <div className="container-fluid navbar-dark">
        <Link passHref className="navbar-brand fw-bold fs-3" href="/">
          <Image
            style={{ filter: "invert(.7)" }}
            src="/serving-dish.png"
            width={40}
            height={50}
            alt="Middle Eastern Food"
          />
        </Link>
        <div className="d-flex gap-3">
          <Link passHref className="btn" href="/cart">
            <CartIcon />
          </Link>
          <Link passHref href="/login" className="btn">
            <AvatarIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
}
