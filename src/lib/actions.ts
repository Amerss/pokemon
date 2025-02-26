import { PAGE_SIZE, TYPE_SEPARATOR } from '@/config';
import { NamedAPIResource, Result, TypeData } from '@/interface';

// 获取宝可梦列表
export const getPokemons = async ({
  limit = PAGE_SIZE,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
}): Promise<Result> => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    {
      cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  );
  const data = await res.json();
  return data;
};

export const getPokemonsByType: {
  (type: string): Promise<TypeData>; // 获取该类型下的宝可梦
  (): Promise<Result>; // 获取宝可梦类型集合
} = async (type?: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type || ''}`, {
    cache: 'force-cache',
    next: {
      revalidate: 60 * 60 * 24,
    },
  });
  return await res.json();
};

// 获取多个类型下的宝可梦
export const getPokemonsByTypes = async (
  types: string
): Promise<Array<NamedAPIResource>> => {
  // 将 CSV 字符串分割成数组
  const typeArray = types
    .split(TYPE_SEPARATOR)
    .filter((v) => v)
    .map((type) => type.trim());

  // 并发请求所有类型的宝可梦
  const pokemonDataArray = await Promise.all(
    typeArray.map((type) => getPokemonsByType(type))
  );

  // 使用 Map 来存储每个宝可梦出现的次数
  const pokemonCount = new Map<string, number>();
  pokemonDataArray.forEach((typeData: TypeData) => {
    typeData.pokemon.forEach(({ pokemon }) => {
      pokemonCount.set(pokemon.name, (pokemonCount.get(pokemon.name) || 0) + 1);
    });
  });

  // 并集
  const result: Array<NamedAPIResource> = [];
  pokemonCount.forEach((count, name) => {
    if (count === typeArray.length) {
      const url = pokemonDataArray[0].pokemon.find(
        (p) => p.pokemon.name === name
      )?.pokemon.url;
      if (url) {
        result.push({ name, url });
      }
    }
  });

  return result;
};

interface PaginatedResult {
  results: NamedAPIResource[];
  count: number;
  next: boolean;
  previous: boolean;
}

export const getPaginatedPokemons = async ({
  type = '',
  limit = PAGE_SIZE,
  offset = 0,
}: {
  type?: string;
  limit?: number;
  offset?: number;
}): Promise<PaginatedResult> => {
  if (!type) {
    // 当没有type时，使用原有的getPokemons
    const data = await getPokemons({ limit, offset });
    return {
      results: data.results,
      count: data.count,
      next: !!data.next,
      previous: !!data.previous,
    };
  } else {
    // 当有type时，使用getPokemonsByTypes
    const allPokemons = await getPokemonsByTypes(type);
    const count = allPokemons.length;

    // 计算分页
    const start = offset;
    const end = Math.min(offset + limit, count);
    const results = allPokemons.slice(start, end);

    return {
      results,
      count,
      next: end < count,
      previous: offset > 0,
    };
  }
};
