import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const TYPE_COLORS = {
  normal:   "bg-gray-400",
  fire:     "bg-red-500",
  water:    "bg-blue-500",
  grass:    "bg-green-500",
  electric: "bg-yellow-400",
  ice:      "bg-blue-200",
  fighting: "bg-red-700",
  poison:   "bg-purple-500",
  ground:   "bg-yellow-500",
  flying:   "bg-indigo-300",
  psychic:  "bg-pink-500",
  bug:      "bg-green-700",
  rock:     "bg-yellow-700",
  ghost:    "bg-indigo-800",
  dark:     "bg-gray-800",
  dragon:   "bg-indigo-600",
  steel:    "bg-gray-300",
  fairy:    "bg-pink-300",
};


export default function Pokemon() {
const [pokemonData, setPokemonData] = useState(null);
const { pokeID } = useParams();


useEffect(() => {
    async function fetchPokemon() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
    const data = await res.json();
    setPokemonData(data);
}
    fetchPokemon();
}, [pokeID]);

if (!pokemonData) {
    return <p>Loading...</p>;
}

const {
    name: pokemonName,
    id,
    weight,
    height,
    sprites,
    types
} = pokemonData;

const imageUrl =
    sprites?.other?.dream_world?.front_default ||
    sprites?.front_default;

return (
    <div className="pokemon p-4">
    
    <h1 className="text-3xl font-bold capitalize">{pokemonName}</h1>

<ul className="flex space-x-2 mb-4 justify-center">
{types.map(({ slot, type: { name: typeName } }) => {
    const colorClass = TYPE_COLORS[typeName] || "bg-gray-500";

return (
    <li
        key={slot}
        className={`px-3 py-1 rounded capitalize ${colorClass}`}>
        {typeName}
    </li>
    );
})}
</ul>

    <p>Pokémon ID: {id}</p>
    <p>Weight: {weight} lbs</p>
    <p>Height: {height}</p>

    <img
        className="mx-auto my-5"
        src={imageUrl}
        alt={pokemonName}
    />
    </div>
);
}
