import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')

  return (
    <section id="center">
      <h1>Task Board</h1>
      <p>Hello world</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task..."
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default App
