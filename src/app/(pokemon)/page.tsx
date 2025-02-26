import { TypeGroup } from '@/components';
import { PAGE_SIZE, TYPE_SEPARATOR } from '@/config';
import { SearchParams } from '@/interface';
import { getPokemonsByType, getPaginatedPokemons } from '@/lib';
import PokemonCard from '@/components/pokemon-card';
import { Suspense } from 'react';
import Link from 'next/link';

export default async function Page(props: {
  searchParams?: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const types = getPokemonsByType();
  const typeCsv = (searchParams?.type as string)?.trim() || '';
  const offset = Number(searchParams?.page) || 1;

  const { count, results, next, previous } = await getPaginatedPokemons({
    type: typeCsv,
    limit: PAGE_SIZE,
    offset: PAGE_SIZE * (offset - 1),
  });

  return (
    <div className="flex flex-col gap-4 px-12">
      <h1 className="text-center">欢迎来到宝可梦世界</h1>
      <div>
        <span>Total count: </span>
        <span>{count}</span>
      </div>
      <div>
        <TypeGroup
          typeList={types}
          defaultActive={typeCsv.split(TYPE_SEPARATOR)}
        />
      </div>
      <div className="grid grid-cols-6 gap-16">
        {results.map((pokemon) => (
          <Suspense key={pokemon.name} fallback={<div>loading...</div>}>
            <PokemonCard url={pokemon.url} />
          </Suspense>
        ))}
      </div>
      <div className="flex justify-center gap-4 my-4">
        {previous && (
          <Link
            href={{
              pathname: '/',
              query: {
                ...searchParams,
                page: offset - 1,
              },
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Previous
          </Link>
        )}
        {next && (
          <Link
            href={{
              pathname: '/',
              query: {
                ...searchParams,
                page: offset + 1,
              },
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
