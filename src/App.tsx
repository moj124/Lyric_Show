import { greet } from "./utils/greet";
import {getLyrics} from './utils/getLyrics';

function App(): JSX.Element {
  getLyrics()
  return <h1>{greet("World")}</h1>;
}

export default App;
