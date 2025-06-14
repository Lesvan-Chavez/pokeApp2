import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import PokemonImage from './pokemonImage';



export default function PokeCards({ col = 5 }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0);
    const [pokeCount, setPokeCount] = useState(0);

    const pokeLimitOptions = [10, 25, 50, 100, 150];
    if (pokeCount > 150) {
        pokeLimitOptions.push(pokeCount);
    }
    const [limit, setLimit] = useState(pokeLimitOptions[0]);


    const pokeURL = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`

    const fetchPokemon = () => {
        fetch(pokeURL)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log('Data', data.results);
                setPokemonList(data.results);
                setPokeCount(data.count)
            })
    }

    useEffect(() => {
        const newOffset = (currentPage - 1) * limit;
        setOffset(newOffset);
    }, [currentPage, limit]);

    useEffect(() => {
        fetchPokemon();
    }, [offset, limit])


    const dropDownOptions = () => {
        const numberOfPages = Math.ceil(pokeCount / limit);
        console.log("number of page", numberOfPages)
        return (
            <div>
                <div>
                    <label htmlFor="pageNumbers">Page:</label>
                    <select name='pageNumbers' id="pageNumbers" className='select select-bordered' value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))}>
                        {Array.from({ length: numberOfPages }, ((page, i) => {
                            const pageNumber = i + 1;
                            return (
                                <option key={i} value={pageNumber}>{pageNumber}</option>
                            )
                        }))}
                    </select>
                </div>
                <div>
                    <label htmlFor="itemsPerPage" className="mr-2">
                        Items per page:
                    </label>
                    <select
                        name="itemsPerPage"
                        id="itemsPerPage"
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="select select-bordered"
                    >
                        {pokeLimitOptions.map((optionValue) => (
                            <option key={optionValue} value={optionValue}>
                                {optionValue}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }




    return (
        <div>
            {dropDownOptions()}
            <div className={`grid grid-cols-${col} gap-4`}>
                {pokemonList.map((pokemon, index) => {
                    const urlParts = pokemon.url.split('/');
                    console.log("url parts", urlParts);
                    const pokeID = Number(urlParts[urlParts.length - 2]);
                    const pokeLinkUrl = `/pokemon/${pokeID}`;
                
                    return (
                        <Link to={pokeLinkUrl} key={pokeID} className='w-36 col-span-1'>
                            <div className='card shadow-sm' >
                                <figure>

                                    <PokemonImage pokeID={pokeID} pokemonName={pokemon.name}/>

                                </figure>
                                <h2 className='card-title capitalize'>{pokemon.name}</h2>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}