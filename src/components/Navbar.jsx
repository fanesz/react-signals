import { computed } from "@preact/signals-react";
import { pokemon } from "../App"

const Navbar = () => {

  const totalPokemon = computed(() => {
    return pokemon.value.count
  })

  return (
    <div>
      This is Navbar | Total pokemon: {totalPokemon}
    </div>
  )
}

export default Navbar