"use client";
import AvatarIcon from "@/icons/Avatar";
import CartIcon from "@/icons/Cart";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { dropdownButtonGenerator } from "@/components/widgets/Dropdown";
import AuthGuard from "@/components/auth/AuthGuard";
import GridIcon from "@/icons/Grid";
import { useCart } from "@/contexts/cart-context";
import useClickout from "@/hooks/use-clickout";

const navRoutes = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Contact Us", href: "/contact" },
];
const AvatarDoopdown = dropdownButtonGenerator(({ onClick }) => (
  <button className="btn" onClick={onClick}>
    <AvatarIcon />
  </button>
));

export default function Navbar() {
  const navRef = useRef(null);
  const { auth, user } = useAuth();
  const { cart } = useCart();
  const pathName = usePathname();
  const { show, setShow } = useClickout(navRef);
  const signOut = () => {
    auth.signOut();
  };
  return (
    <nav ref={navRef} className="navbar navbar-expand-lg bg-transparent">
      <div className="container-fluid navbar-dark">
        <div className="flex-grow-1">
          <Link className="navbar-brand" href="/">
            <Image
              src="/serving-dish-2.png"
              width={40}
              height={40}
              alt="Middle Eastern Food"
            />
          </Link>
          <AuthGuard isAdmin={true}>
            <Link href="/admin">
              <GridIcon className="text-white fw-bold" />
            </Link>
          </AuthGuard>
        </div>

        <div
          className={`collapse navbar-collapse ${(show && "show") || ""}`}
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav flex-grow-1">
            {navRoutes.map((r) => (
              <Link
                key={r.href}
                className={`nav-link ${pathName === r.href ? "active" : ""}`}
                href={r.href}
              >
                {r.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="d-flex mx-3 gap-4">
          <Link passHref className="btn" href="/cart">
            <div className="position-relative">
              <span className="position-absolute badge bg-primary start-100 top-0 rounded-pill translate-middle-y">
                {cart?.items.reduce((acc, cur) => acc + cur.quantity, 0) || 0}
              </span>
              <CartIcon />
            </div>
          </Link>
          <AuthGuard
            fallback={
              <Link
                passHref
                href="/login"
                className="text-white fw-semibold btn"
              >
                Login
              </Link>
            }
          >
            <AvatarDoopdown>
              <li className="">
                <Link href="/profile" className="dropdown-item">
                  Profile
                </Link>
              </li>
              <li className="">
                <button onClick={signOut} className="dropdown-item">
                  Logout
                </button>
              </li>
            </AvatarDoopdown>
          </AuthGuard>
        </div>
        <button
          onClick={() => setShow(!show)}
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}
