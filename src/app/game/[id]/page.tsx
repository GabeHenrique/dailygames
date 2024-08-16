import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {GameProps} from "@/utils/types/game";
import {redirect} from "next/navigation";
import Image from "next/image";
import {Container} from "@/components/container";
import {Label} from "@/components/label";
import {Gamecard} from "@/components/gamecard";
import React from "react";
import {Metadata} from "next";

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {id}: { id: string } = params;
  try {
    const data: GameProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, {next: {revalidate: 60}})
      .then((response) => response.json())
      .catch(() => {
        return {
          title: "DailyGames - Descubra jogos incríveis para se divertir",
        }
      })
    return {
      title: `${data.title} - DailyGames`,
      description: data.description.slice(0, 100).concat("..."),
      openGraph: {
        title: `${data.title} - DailyGames`,
        images: [
          data.image_url
        ]
      },
      robots: {
        index: true,
        follow: true,
        nocache:true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        },
      }
    }
  } catch (e) {
    return {
      title: "DailyGames - Descubra jogos incríveis para se divertir",
    }
  }

}

async function getData(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, {cache: "no-store"})
    return response.json();
  } catch (e) {
    console.log(e)
  }
}

async function getRecomendedGames() {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`, {cache: "no-store"})
    return response.json();
  } catch (e) {
    console.log(e)
  }
}

export default async function GameDetail({params}: Params) {
  const {id}: { id: string } = params;
  const [data, games]: [GameProps, GameProps[]] = await Promise.all([getData(id), getRecomendedGames()]);

  const recomended = games.filter((game) => {
    return game.id !== data.id && game.categories.some((category) => data.categories.includes(category))
  }).slice(0, 4);
  if (!data) {
    redirect("/404");
  }
  return (
    <main className="w-full text-black">

      <Container>
        <div className="bg-black h-80 sm:h-96 w-full relative rounded-lg">
          <Image
            src={data.image_url}
            alt="Banner do jogo acessado"
            priority={true}
            quality={100}
            fill={true}
            className="max-h-96 object-cover rounded-lg opacity-60 hover:opacity-100 transition-all duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
          />
        </div>
        <h1 className="font-bold text-xl mb-4 mt-8">{data.title}</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <p className="text-sm text-gray-400">{data.release}</p>
          {data.platforms.map((platform) => (
            <Label label={platform} key={platform}/>
          ))}
        </div>
        <p className="my-4">{data.description}</p>
        <div className="flex flex-wrap gap-2">
          {data.categories.map((category) => (
            <Label variant="secondary" label={category} key={category}/>
          ))}
        </div>
        <h2 className={"text-lg font-bold mt-8 mb-5"}>
          Jogos recomendados:
        </h2>
        <section className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

          {recomended.map((game) => (
            <Gamecard key={game.id} game={game}></Gamecard>
          ))
          }
        </section>

      </Container>
    </main>
  )
}