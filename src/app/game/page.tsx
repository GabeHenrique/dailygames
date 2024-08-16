import {Container} from "@/components/container";
import {Input} from "@/components/input";
import {Gamecard} from "@/components/gamecard";
import React from "react";
import {GameProps} from "@/utils/types/game";

async function getGames() {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`, {next: {revalidate: 320}});
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export default async function Games() {
  const [result]: [GameProps[]] = await Promise.all([getGames()]);
  return (
    <main className="w-full text-black">
      <Container>
        <Input/>
        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {result && result.map((game) => (
            <Gamecard key={game.id} game={game}></Gamecard>
          ))
          }
        </section>
      </Container>
    </main>
  );
}
