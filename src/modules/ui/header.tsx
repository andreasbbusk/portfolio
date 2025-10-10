import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo.svg";

export default function Header() {
  return (
    <header className="absolute py-4 px-8">
      <nav aria-label="Main navigation">
        <ul className="flex gap-6 list-none items-center">
          <li>
            <Image src={Logo} width={60} height={60} alt="Portfolio logo" />
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
