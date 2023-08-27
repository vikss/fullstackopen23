import { useState } from 'react'

const App = () => {
  const anecdotesObj = [
    { name: 'If it hurts, do it more often.', vote: 0 },
    { name: 'Adding manpower to a late software project makes it later!', vote: 0 },
    { name: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', vote: 0 },
    { name: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', vote: 0 },
    { name: 'Premature optimization is the root of all evil.', vote: 0 },
    { name: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', vote: 0 },
    { name: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', vote: 0 },
    { name: 'The only way to go fast, is to go well.', vote: 0 },
  ]
  const [anecdotes, setAnecdotes] = useState(anecdotesObj)
  const [selected, setSelected] = useState(0)
  const [popular, setPopular] = useState(anecdotes[0].name)

  const handleNextClick = () => {

    console.log(anecdotes)
    let num = anecdotes.length
    console.log(`anecdotes length is ${anecdotes.length}`)
    let randomNum = Math.floor(Math.random() * num)
    console.log(`random number is ${randomNum}`)
    setSelected(randomNum)
    console.log(`selected is ${selected}}`)

  }
  const handleVote = () => {


    let anecdotesCopy = [...anecdotes]
    anecdotesCopy[selected].vote += 1;
    console.log(anecdotesCopy)
    setAnecdotes(anecdotesCopy)
    maxVotes()


  }
  const maxVotes = () => {

    let chosen = anecdotes[0];
    let maxVote = 0;

    for (let i = 0; i < anecdotes.length; i++) {
      if (anecdotes[i].vote > maxVote) {
        chosen = anecdotes[i]
        maxVote = chosen.vote
      }


    }
    console.log(chosen)
    setPopular(chosen.name)


  }
  console.log(`selected is ${selected}}`)
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected].name}</p>
      <p>has {anecdotes[selected].vote} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextClick}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{popular}</p>
    </div>
  )
}

export default App