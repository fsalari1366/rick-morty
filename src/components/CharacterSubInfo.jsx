import React from 'react'

const CharacterSubInfo = ({character, isAddToFavourite, onAddFavourite}) => {
  return (
    <div className="character-detail">
        <img
         src={character.image}
         alt={character.name}
         className='character-detail__img'
          />
          <div className='character-detail__info'>
            <h3 className='name'>
            <span>{character.gender === "Male" ? "👱🏻‍♂️" : "👩🏻‍🦳"}</span>
          <span>&nbsp;{character.name}</span>
            </h3>
            <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
          ></span>
          <span>&nbsp;{character.status}</span>
          <span> - &nbsp;{character.species}</span>
        </div>
        <div className="location">
          <p>Last known location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddToFavourite ? 
          ( <p>Already Added To Favourite ✅</p> 
        ) : (
            <button
            className="btn btn--primary"
            onClick={() => onAddFavourite(character)}
          >
            Add to Favourite
          </button>
          ) }
            
        </div>
          </div>
       </div>
  )
}

export default CharacterSubInfo