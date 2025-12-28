import { memo, useState } from 'react';
import './App.css'

function SlowComponent() {
  const startTime = performance.now();
  while (performance.now() - startTime < 100) {
    // Burn CPU cycles
  }
  // const showTime = performance.now();
  const showTime = (new Date()).toLocaleTimeString()
  return (
    <div className='SlowComponent'>
      {showTime}
    </div>
  )
}

const CachedSlowComponent = memo(SlowComponent)

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
          <CachedSlowComponent
            key={i}
          />
        ))}

    </div>

  )
}


export default App
