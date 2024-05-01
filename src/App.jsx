import {useState, useEffect} from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Search, SearchResult, Favourites } from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "./components/Modal";

function App(){
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState(
    () => JSON.parse(localStorage.getItem('FAVOURITES')) || []);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        setCharacters(data.results.slice(0,5));
        
      } catch (err) {
         toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
     if(query.length < 3) {
      setCharacters([]);
      return;
     }

    fetchData();

  }, [query]);

  useEffect(() => {
   localStorage.setItem('FAVOURITES', JSON.stringify(favourites))
  }, [favourites])
  

  const handleSelectCharacter = (id) => {
    setSelectedId(prevId => prevId === id ? null : id);
  }

  const handleAddFavourite = (char) => {
    setFavourites((prevFav) => [...prevFav, char] );
  }

  const handleDeleteFavourite = (id) => {
      setFavourites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  }

  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectedId);
  
  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites
          favourites={favourites}
          onDeleteFavourite={handleDeleteFavourite}
        />
      </Navbar>
    <div className="main">
      <CharacterList
       characters={characters}
       isLoading={isLoading}
       onSelectCharacter={handleSelectCharacter}
       selectedId={selectedId}
       />
      <CharacterDetail selectedId={selectedId}
       onAddFavourite={handleAddFavourite}
       isAddToFavourite={isAddToFavourite}
       />
    </div>
    </div>
  )
}

export default App;