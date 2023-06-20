"use client";
import AvatarIcon from "../../icons/Avatar";
import CartIcon from "../../icons/Cart";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../contexts/auth.context";
import { dropdownButtonGenerator } from "@components/widgets/Dropdown";
import AuthGuard from "@components/auth/AuthGuard";

const AvatarDoopdown = dropdownButtonGenerator(({ onClick }) => (
  <button className="btn" onClick={onClick}>
    <AvatarIcon />
  </button>
));

export default function Navbar() {
  const { authState, signOut } = useAuth();
  return (
    <nav className="navbar bg-transparent">
      <div className="container-fluid navbar-dark">
        <Link passHref className="navbar-brand ms-2" href="/">
          <Image
            src="/serving-dish-2.png"
            width={40}
            height={40}
            alt="Middle Eastern Food"
          />
        </Link>
        <div className="d-flex gap-3">
          <Link passHref className="btn" href="/cart">
            <CartIcon />
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
                <button onClick={() => signOut()} className="dropdown-item">
                  Logout
                </button>
              </li>
            </AvatarDoopdown>
          </AuthGuard>
        </div>
      </div>
    </nav>
  );
}
