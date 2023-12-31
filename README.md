# React with @preact/signals-react as state management

Signals basically remove the need for using useState and useEffect to manage state. And with Signals, you don't even have to pass data through component props, similar to provide/inject from Vuejs.

The old way with useState and useEffect you can see on the [old-way](https://github.com/fanesz/react-signals/tree/old-way) branch.

## Code Differences
If you lazy to took a look between those 2 branches, here the code comparison

### Fetching data
#### old-way:
```jsx
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
```

#### Signals:
```jsx
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=";
const pokemon = signal({});
const page = signal(0);

effect(async () => {
  const res = await fetch(BASE_URL + page.value * 5);
  const data = await res.json();
  pokemon.value = data;
})
```

### Update value with trigger
#### old-way:
```jsx
<div>
  <button onClick={() => setPage(prev => prev - 1)}>Previous Page</button>
  <button onClick={() => setPage(prev => prev + 1)}>Next Page</button>
  <div>Current page: {page}</div>
</div>
```
#### Signals:
```jsx
<div>
  <button onClick={() => page.value -= 1}>Previous Page</button>
  <button onClick={() => page.value += 1}>Next Page</button>
  <div>Current page: {page}</div>
</div>
```

### The main different
Two points above have a quite similar things right?, but the main difference is, you actually can export the signals to be used on the other component, and it updated synchronously, example:
```jsx
// main component
export const pokemon = signal({});
// ... the rest code for fetching


// other component:
import { pokemon } from "../App"
const Navbar = () => {
  return (
    <div>
      This is Navbar | Total pokemon: {pokemon.value.count}
    </div>
  )
}
```
According to this issue: https://github.com/preactjs/signals/issues/469. There is some problem, so you need to use computed like this:
<br>`const totalPokemon = computed(() => pokemon.value.count)`
<br>OR put `import "@preact/signals-react/auto"` to the root of app.

## Conclusion
By using Signals, you don't need to pass the data by the props like this:
`<Navbar data={pokemon} setData={setPokemon} />`. You can easily import it and change the data everywhere. It could be a substitude for state management such as react reducer, redux, zustand, but every framework have their on speciality.