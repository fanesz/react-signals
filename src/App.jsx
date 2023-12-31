import { effect, signal, computed } from "@preact/signals-react";
import './App.css'
import Navbar from "./components/Navbar";
import "@preact/signals-react/auto"

export const pokemon = signal({});
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=";
const page = signal(0);

effect(async () => {
  const res = await fetch(BASE_URL + page.value * 5);
  const data = await res.json();
  pokemon.value = data;
})

const computedPokemon = computed(() => {
  return pokemon.value.results?.map((item, index) => (
    <div key={index}>
      [{index + page * 5}] {item.name}
    </div>
  ))
});


function App() {
  return (
    <div>

      <Navbar />

      <div>
        Pokemon list:
        {computedPokemon}
      </div>

      <div>
        <button onClick={() => page.value -= 1}>Previous Page</button>
        <button onClick={() => page.value += 1}>Next Page</button>
        <div>Current page: {page}</div>
      </div>

    </div>
  )
}

export default App
