import React from 'react';
import Character from './Character';
import Loader from "./Loader";
import { EyeSlashIcon } from '@heroicons/react/24/outline'
import { EyeIcon } from '@heroicons/react/24/outline'

const CharacterList = ({selectedId, characters, isLoading, onSelectCharacter}) => {

  if (isLoading) return (
    <div className='characters-list'>
      <Loader />
    </div>
  )

  
  return (
    <div className="characters-list">
      {characters.map((item) => (
          <Character key={item.id} item={item}
           >
            <button className='icon red' onClick={() => onSelectCharacter(item.id)}>
        {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
    </button>
           </Character>
      ))
      }
        
    </div>
  )
}

export default CharacterList;
