import champion1 from './champion1.json';
import how_great_is_our_god from './how_great_is_our_god.json';
import way_2_sexy from './way_2_sexy.json'

function App(): JSX.Element {
  // const {name, text} = champion1[0];
  // const {name, text} = how_great_is_our_god[0];
  const  {name, text}  = way_2_sexy[0];

  const lines = text.map((element,index) => element.length > 1 ? <p key={index}>{element}</p>: <br></br>)

  return (
    <main>
      <h1>{name}</h1>
      {lines}
    </main>);
}

export default App;
