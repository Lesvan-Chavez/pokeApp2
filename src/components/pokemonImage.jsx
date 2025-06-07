import React, { useState } from 'react';



export default function PokemonImage({ pokeID, pokemonName, className }) {


    const dreamWorldSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeID}.svg`;
    const defaultSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`;

    const [currentImage, setCurrentImage] = useState(dreamWorldSprite);
    const [hasTriedDreamWorld, setHasTriedDreamWorld] = useState(false);
    const [allImagesFailed, setAllImagesFailed] = useState(false);


    const handleImageError = () => {
        if (!hasTriedDreamWorld) {
            setCurrentImage(defaultSprite);
            setHasTriedDreamWorld(true);
        } else if (hasTriedDreamWorld && !allImagesFailed) {
            setAllImagesFailed(true);
            setCurrentImage(null);
        }
    };

    if (allImagesFailed) {
        return (
            <div className={``}>
                No Image
            </div>
        )
    }

    return (
        <img
            src={currentImage}
            alt={pokemonName}
            onError={handleImageError}
            className={className}
            />
        )
}