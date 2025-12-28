import { memo, useDeferredValue, useMemo, useState } from 'react';
import './App.css'

// Generate mock data
function generateItems (length: number) {
  return Array.from({ length }, (_, i) => `Item ${i + 1}: ${Math.random().toString(36).substr(2, 9)}`);
};
const ITEMS = generateItems(50)

const CachedSlowComponent = memo(SlowComponent)

function App() {

  // const [query, setQuery] = useState<boolean>(true)
  const [query, setQuery] = useState<string>('')
  const deferredQuery = useDeferredValue(query)


  function queryChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.currentTarget.value)
  }

  const filteredItems = useMemo(() => {
    return(ITEMS.filter(item => item.includes(deferredQuery)))
  }, [deferredQuery])

  return (
    <div className='App'>
      <input type="text" placeholder="enter something" onChange={queryChanged} value={query}/>

      {filteredItems.map((item, idx) => <CachedSlowComponent key={idx} value={item}/>)}

    </div>

  )
}

interface SlowComponentProps {
  value: string
}
function SlowComponent(props: SlowComponentProps ) {
  const startTime = performance.now();
  while (performance.now() - startTime < 10) {
    // Burn CPU cycles
  }
  // const showTime = performance.now();
  const showTime = (new Date()).toLocaleTimeString()
  return (
    <div className='SlowComponent'>
      {props.value} | {showTime}
    </div>
  )
}
export default App
