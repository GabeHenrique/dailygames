import {Container} from "@/components/container";
import {GameProps} from "@/utils/types/game";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {BsArrowRightCircle} from "react-icons/bs"
import {Input} from "@/components/input";
import {Gamecard} from "@/components/gamecard";

async function getDailyGame() {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, {next: {revalidate: 320}});
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

async function getGames() {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`, {next: {revalidate: 320}});
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const [dailyGame, games]: [GameProps, GameProps[]] = await Promise.all([getDailyGame(), getGames()]);
  return (
    <main className="w-full">
      <Container>
        <h1 className="text-center font-bold text-xl mt-8 mb-5"> Separamos um jogo exclusivo para você</h1>
        <Link href={`/game/${dailyGame.id}`}>
          <section className="w-full bg-black rounded-lg">
            <div className="w-full max-h-96 h-96 relative">
              <div className="absolute z-20 bottom-0 p-3 flex justify-center items-center gap-2">
                <p className="font-bold text-xl text-white">{dailyGame.title}</p>
                <BsArrowRightCircle size={24} color="#FFFFFF"/>
              </div>
              <Image
                src={dailyGame.image_url}
                alt={dailyGame.title}
                priority={true}
                quality={100}
                fill={true}
                className="max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 transition-all duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
              />
            </div>
          </section>
        </Link>
        <Input/>
        <h2 className="text-lg font-bold mt-8 mb-5">
          Jogos para conhecer
        </h2>
        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games.map((game) => (
            <Gamecard key={game.id} game={game}></Gamecard>
          ))
          }
        </section>
      </Container>
    </main>
  );
}
