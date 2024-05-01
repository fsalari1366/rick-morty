import React, {useState} from 'react'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'


const EpisodeList = ({episodes}) => {
    const [sortBy, setSortBy] = useState(true);

    let sortedEpisodes;

    if (sortBy) {
        sortedEpisodes = [...episodes].sort((a,b) => new Date(a.created) - new Date(b.created));
    } else {
        sortedEpisodes = [...episodes].sort((a,b) => new Date(b.created) - new Date(a.created)); 
    }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes:</h2>
        <button onClick={() => setSortBy((is) => !is)}>
          <ArrowUpCircleIcon
            className="icon"
            style={{rotate: sortBy ? "0deg" : "180deg"}}
          />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item,index) => (
          <li key={item.id}>
          <div>
            {String(index + 1).padStart(2, "0")} - {item.episode} : <strong>{item.name}</strong>
          </div>
          <div className="badge badge--secondary">{item.air_date}</div>
        </li>
        ))}
        
      </ul>
    </div>
  )
}

export default EpisodeList