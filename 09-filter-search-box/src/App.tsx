import { useState } from 'react';
import './App.css'

// Generate mock data
function generateItems (length: number) {
  return Array.from({ length }, (_, i) => `Item ${i + 1}: ${Math.random().toString(36).substr(2, 9)}`);
};
const ITEMS = generateItems(50)

function App() {

  // const [query, setQuery] = useState<boolean>(true)
  const [items, setItems] = useState<string[]>(ITEMS)


  function queryChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setItems(ITEMS.filter(item => item.includes(e.currentTarget.value)))
  }

  return (
    <div className='App'>
      <input type="text" placeholder="enter something" onChange={queryChanged} />

      {items.map((item, idx) => <SlowComponent key={idx} value={item}/>)}

    </div>

  )
}

interface SlowComponentProps {
  value: string
}
function SlowComponent(props: SlowComponentProps ) {
  // const startTime = performance.now();
  // while (performance.now() - startTime < 10) {
  //   // Burn CPU cycles
  // }
  // const showTime = performance.now();
  const showTime = (new Date()).toLocaleTimeString()
  return (
    <div className='SlowComponent'>
      {props.value} | {showTime}
    </div>
  )
}
export default App
