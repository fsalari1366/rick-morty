import React, {useEffect, useState} from 'react'
import axios from 'axios' 
import Loader from './Loader'
import CharacterSubInfo from './CharacterSubInfo'
import EpisodeList from './EpisodeList'

const CharacterDetail = ({selectedId, onAddFavourite, isAddToFavourite}) => {
   const [character, setCharacter] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [episodes, setEpisodes] = useState([]);

   useEffect(() => {
    async function fetchCharacter () {
      try {
        setIsLoading(true);
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/${selectedId}`
      );
      setCharacter(data);

      const episodesId = data.episode.map((e) => e.split('/').at(-1));
      const { data : episodeData } = await axios.get(
        `https://rickandmortyapi.com/api/episode/${episodesId}`
      );
      setEpisodes([episodeData].flat().slice(0, 6));
      
      } catch (error) {
        toast.error(error.response.data.error)
      } finally {
        setIsLoading(false);
      }
    }

    if(selectedId) fetchCharacter();
    
  }, [selectedId])

  if(isLoading) return (
    <div style={{flex: 1}}>
    <Loader />
  </div>
  )

   if(!character || !selectedId)
    return (
  <div style={{flex: 1, color: "var(--slate-300)"}}>
    Please select a character.
  </div>
  );
  

  return (
    <div style={{flex: 1}}>
       <CharacterSubInfo 
       character={character} 
       isAddToFavourite={isAddToFavourite} 
       onAddFavourite={onAddFavourite}
       />
       <EpisodeList episodes={episodes} />
    </div>
  )
}

export default CharacterDetail