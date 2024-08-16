import Link from "next/link";
import Image from "next/image";
import { LiaGamepadSolid} from "react-icons/lia";

export function Header() {
  return (
    <header className="w-full h-28 bg-slate-100 text-black px-2">
      <div className="max-w-screen-xl mx-auto flex justify-center items-center h-28 sm:justify-between">
        <nav className="flex justify-center items-center gap-4">
          <Link href="/">
            <Image
              className="w-full h-full"
              src="/logo.svg"
              width="168"
              height="39"
              alt="Logotipo da DalyGames"
              quality={100}
              priority
            />
          </Link>
          <Link href="/game">
            Games
          </Link>
          <Link href="/profile">
            Perfil
          </Link>
        </nav>
        <div className="hidden sm:flex justify-center items-center">
          <Link href="/profile">
            <LiaGamepadSolid id="game-icon" size={34} color="#475569"/>
          </Link>
        </div>
      </div>

    </header>
  );
}