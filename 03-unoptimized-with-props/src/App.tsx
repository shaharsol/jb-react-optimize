import { useState } from 'react';
import './App.css'

function App() {

  const [toggle, setToggle] = useState<boolean>(true)

  function changeState () {
    setToggle(!toggle)
  }
  return (
    <div className='App'>
      <p>current toggle: {toggle ? 'On' : 'Off'}</p>

      <button onClick={changeState}>change state</button>
      {Array.from({ length: 10 }, (_, i) => (
          <SlowComponent
            key={i}
            index={i}
          />
        ))}

    </div>

  )
}

interface SlowComponentProps {
  index: number
}
function SlowComponent(props: SlowComponentProps) {
  const startTime = performance.now();
  while (performance.now() - startTime < 100) {
    // Burn CPU cycles
  }
  // const showTime = performance.now();
  const showTime = (new Date()).toLocaleTimeString()
  return (
    <div className='SlowComponent'>
      {props.index} | 
      {showTime}
    </div>
  )
}
export default App
