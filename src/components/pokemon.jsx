import { useState, useEffect } from 'react';
import { useParams } from 'react-router';



export default function Pokemon() {
    const [pokemonData, setPokemonData] = useState([]);
    const { pokeID } = useParams();

const fetchPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        setPokemonData(data)
    })
}    

useEffect(() => {
    fetchPokemon();
}, [pokeID]);
    
    const { name, id, sprites } = pokemonData;
    const imageUrl = sprites?.other?.dream_world?.front_default || sprites?.front_default;

    return (
        <div className="pokemon">
        <h1>{name}</h1>
        <p>ID: {id}</p>
        <img src={imageUrl} alt={name} />
    </div>
        
)
    
}