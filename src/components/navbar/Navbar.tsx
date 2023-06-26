"use client";
import AvatarIcon from "@/icons/Avatar";
import CartIcon from "@/icons/Cart";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { dropdownButtonGenerator } from "@/components/widgets/Dropdown";
import AuthGuard from "@/components/auth/AuthGuard";
import GridIcon from "@/icons/Grid";

const AvatarDoopdown = dropdownButtonGenerator(({ onClick }) => (
  <button className="btn" onClick={onClick}>
    <AvatarIcon />
  </button>
));

export default function Navbar() {
  const { auth, user } = useAuth();

  const signOut = () => {
    auth.signOut();
  };
  return (
    <nav className="navbar bg-transparent">
      <div className="container-fluid navbar-dark">
        <div className="hstack align-items-center">
          <Link passHref className="navbar-brand ms-2" href="/">
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
                <button onClick={signOut} className="dropdown-item">
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
