import logo from "./logo.svg"
import "./App.css"
import Routes from "./router/Routes"
import { CharactersProvider } from "./providers/AllCharactersProvider"
import { CharacterProvider } from "./providers/CharacterProvider"

function App() {
  return (
    <CharactersProvider>
      <CharacterProvider>
        <Routes />
      </CharacterProvider>
    </CharactersProvider>
  )
}

export default App
