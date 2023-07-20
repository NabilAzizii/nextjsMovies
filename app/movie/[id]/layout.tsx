import { Movie } from '@/app/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

async function getData(id: string) {
  const url = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODFmNDE2ZTdmMjlmNmFiNmE4M2Q5MTc3MTI1MmZjZSIsInN1YiI6IjY0YjhlZGQ5MTEzODZjMDEwYzE3ZWViMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.up0OaEv1Ns77eCnwk9gbE-rNZIDc1W72c-lQVxLgElc',
    },
    next: {
      revalidate: 60,
    },
  });
  return url.json();
}

export default async function MovieId({ params, children }: { children: ReactNode; params: { id: string } }) {
  const data: Movie = await getData(params.id);

  return (
    <div className="min-h-screen p-10">
      <div className="h-[40vh] relative">
        <Image src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} alt="Image of Movie" className="object-cover w-full rounded-lg" fill />
      </div>
      <h1 className="text-4xl font-bold text-center pt-5">{data.title}</h1>
      <div className="flex gap-x-10 mt-10">
        <div className="w-1/2 font-medium">
          <h1>
            <span className="underline">Homepage:</span>{' '}
            <Link href={data.homepage} target="_blank">
              Link
            </Link>
          </h1>

          <h1>
            <span className="underline">Original Language:</span> {data.original_language}
          </h1>

          <p>
            <span className="underline">Overview:</span> {data.overview}
          </p>

          <p>
            <span className="underline">Release Date:</span> {data.release_date}
          </p>
        </div>
        <div className="w-1/2">{children}</div>
      </div>
    </div>
  );
}
