import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {

  const [pokemon, setPokemon] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState("");
  const [filterType, setFilterType] = useState("")
  const [weakness, setWeakness] = useState("");

  let pokemondata;

  useEffect(() => {


    fetch(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        pokemondata = data.pokemon;
        setPokemon(pokemondata);
      })
      .catch(console.error);
  })

  let searchedPokemonList = pokemon;
  let filteredPokemonList = pokemon;
 
  
   filteredPokemonList = pokemon.filter( (singlePokemon) => {
    if(filterType == ""){
      return true;
    }
    return singlePokemon.type.includes(filterType)  
    
  })

  searchedPokemonList = filteredPokemonList.filter( (singlePokemon) => {
    if(searchPokemon != ""){
      return singlePokemon.name.startsWith(searchPokemon)
    }
    return true;
})

  filteredPokemonList = searchedPokemonList.filter( (singlePokemon) => {
    if(weakness != ""){
      return singlePokemon.weaknesses.includes(weakness)
    }
   return true;
})

function displayFacts(fact){
  let elements = [];
  for(let i = 0; i < fact.length; i++){
    elements.push(<li id = "display">{fact[i]}</li>)
  }
  return elements;
}

  return (
    <>
      <h1>Pokemon</h1>

     

        <label htmlFor="searchPokemon">Search</label>
        <input
          type="text"
          id="searchPokemon"
          name="searchPokemon"
          onChange={(changeEvent) => {
            setSearchPokemon(changeEvent.target.value);
          }}
          value={searchPokemon}
        />
       

        <label htmlFor="type"> Type</label>
        <select name="type" id="type" value={filterType} onChange={(changeEvent) => {
          setFilterType(changeEvent.target.value)
        }}>
          <option value="selectType">Select Type</option>
          <option value="Grass">Grass</option>
          <option value="Poison">Poison</option>
          <option value="Fire">Fire</option>
          <option value="Flying">Flying</option>
          <option value="Water">Water</option>
          <option value="Bug">Bug</option>
          <option value="Normal">Normal</option>
          <option value="Electric">Electric</option>
          <option value="Ground">Ground</option>
          <option value="Fighting">Fighting</option>
          <option value="Psychic">Psychic</option>
          <option value="Rock">Rock</option>
          <option value="Ground">ground</option>
          <option value="Ice">Ice</option>
          <option value="Ghost">Ghost</option>
          <option value="Dragon">Dragon</option>

        </select>

        <label htmlFor="weaknesses">Weakness </label>
        <select name="weaknesses" id="weaknesses" value={weakness} onChange={(changeEvent) => {
          setWeakness(changeEvent.target.value)
        }}>
          <option value="selectType">Select Weakness</option>
          <option value="Grass">Grass</option>
          <option value="Poison">Poison</option>
          <option value="Fire">Fire</option>
          <option value="Flying">Flying</option>
          <option value="Water">Water</option>
          <option value="Bug">Bug</option>
          <option value="Normal">Normal</option>
          <option value="Electric">Electric</option>
          <option value="Ground">Ground</option>
          <option value="Fighting">Fighting</option>
          <option value="Psychic">Psychic</option>
          <option value="Rock">Rock</option>
          <option value="Ground">ground</option>
          <option value="Ice">Ice</option>
          <option value="Ghost">Ghost</option>
          <option value="Dragon">Dragon</option>

        </select>
        
          <ul>
            {filteredPokemonList .map((p) => {
              return <li key={p.id}>
                <h2>{p.name}</h2>
                <img src={p.img} alt={p.title} />
                <div className="pokemonInfo">
                  <p>{p.num + " "}</p>
                  <p><b>Type:</b> {displayFacts(p.type)}</p>
                  <p><b>Weaknesses:</b> {displayFacts(p.weaknesses)}</p>

                </div>
              </li>
            })
            }
          </ul>  
      
    </>
  )

}
export default App
