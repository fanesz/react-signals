import { computed } from "@preact/signals-react";

const Navbar = ({ pokemon }) => {

  // const totalPokemon = computed(() => {
  //   return pokemon.value.count
  // })

  return (
    <div>
      This is Navbar | Total pokemon: {pokemon.count}
    </div>
  )
}

export default Navbar