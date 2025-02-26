interface PokemonCardProps {
  url: string;
}

const PokemonCard = async ({ url }: PokemonCardProps) => {
  // 请求pokemon详情
  const res = await fetch(url).then((res) => res.json());
  const { name, id, sprites } = res;
  return (
    <div className="flex flex-col items-center justify-between">
      <h3>{name}</h3>
      <div className="relative w-full aspect-square">
        <picture className="absolute inset-0">
          <source srcSet={sprites.front_default} type="image/png" />
          <img src={sprites.front_default} alt={name} />
        </picture>
      </div>
      <div>
        <span>Number:</span>
        <span>{id}</span>
      </div>
    </div>
  );
};

export default PokemonCard;
