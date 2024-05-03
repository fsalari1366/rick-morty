import { useState, useEffect } from 'react';
import axios from "axios";
import {toast} from "react-hot-toast";

const useCharacter = (url, query) => {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
          try {
            setIsLoading(true);
            const { data } = await axios.get(
              `${url}=${query}`
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

      return { characters, isLoading }
  
}

export default useCharacter