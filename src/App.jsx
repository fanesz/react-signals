import './App.css'
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

function App() {
  const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=";
  const [pokemon, setPokemon] = useState({});
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(BASE_URL + page * 5);
      const data = await res.json();
      setPokemon(data);
    }
    fetchData();
  }, []);

  const listPokemon = () => {
    return pokemon.results?.map((item, index) => (
      <div key={index}>
        [{index + page * 5}] {item.name}
      </div>
    ))
  };

  return (
    <div>

      <Navbar pokemon={pokemon} />

      <div>
        Pokemon list:
        {listPokemon()}
      </div>

      <div>
        <button onClick={() => setPage(prev => prev - 1)}>Previous Page</button>
        <button onClick={() => setPage(prev => prev + 1)}>Next Page</button>
        <div>Current page: {page}</div>
      </div>

    </div>
  )
}

export default App
