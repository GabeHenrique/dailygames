import {GameProps} from "@/utils/types/game";
import Link from "next/link";
import Image from "next/image";
import {BsArrowRightCircle} from "react-icons/bs";

export function Gamecard(props: {game: GameProps}) {
  const {id, title, image_url} = props.game;

  return (
    <Link href={`/game/${id}`}>
    <section className="w-full bg-slate-200 rounded-lg p-4 mb-5" id="card">
        <div className="w-full h-56 relative hover:scale-105 transition-all duration-300">
          <Image
            src={image_url}
            alt={title}
            quality={100}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
            className="rounded-lg object-cover"
          />
        </div>
      <div className="flex items-center mt-4 justify-between">
        <p className="text-sm font-bold px-2 text-black text-ellipsis truncate whitespace-nowrap">
          {title}
        </p>
        <BsArrowRightCircle id='right-arrow-icon' size={24} color="#000000"/>
      </div>
   </section>
    </Link>
  );
}