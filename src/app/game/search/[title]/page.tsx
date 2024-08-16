import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {GameProps} from "@/utils/types/game";
import {Container} from "@/components/container";
import {Input} from "@/components/input";
import {Gamecard} from "@/components/gamecard";
import React from "react";
import {Linkback} from "@/components/linkback";

async function getSearchResult(title: string) {
  try {
    const decodeTitle = decodeURIComponent(title);
    const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`)
    return response.json();
  } catch (e) {
    console.log(e)
  }
}

export default async function Search({params}: Params) {
  const {title} = params;
  const result: GameProps[] = await getSearchResult(title);

  return (
    <main className="w-full text-black">
      <Container>
        <Input/>
        {!result ? (
          <>
            <p>Não localizamos nenhum resultado para a busca: {title}</p>
            <Linkback/>
          </>
        ) : <h1 className="font-bold text-xl mb-5 mt-8">
          Veja o que encontramos na nossa base:
        </h1>
        }
        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {result && result.map((game) => (
            <Gamecard key={game.id} game={game}></Gamecard>
          ))
          }
        </section>
      </Container>
    </main>
  )
}