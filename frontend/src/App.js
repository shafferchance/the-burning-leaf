import React, {useEffect, useState} from 'react';
import { NavBar } from './components/navigation.component.jsx';

function App() {
  const [loc, setLoc] = useState();
  const [contact, setContact] = useState();

  useEffect(() => {
    Promise.all([
      fetch("/general/location").then(raw => raw.text()),
      fetch("/general/contact").then(rawCom => rawCom.json())
    ])
    .then(results => {
      setLoc(results[0]);
      setContact(results[1]);
    });
  }, [])

  return (
    <>
      <header className={"header"}>
          <h1>The Burning Leaf</h1>
          <hr />
      </header>
      <NavBar />
      <footer>
          <h6>{loc}|{contact}</h6>
      </footer>
    </>
  );
}

export default App;
