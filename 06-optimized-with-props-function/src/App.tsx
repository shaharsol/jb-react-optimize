import { memo, useState } from 'react';
import './App.css'

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
            index={i}
            changeState={changeState}
          />
        ))}

    </div>

  )
}

interface SlowComponentProps {
  index: number
  changeState(): void
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
