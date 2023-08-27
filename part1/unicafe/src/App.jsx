import { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);






  return (<div><h2>give feedback</h2>
    <Button text="good" handleClick={() => setGood(good + 1)}></Button>
    <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}></Button>
    <Button text="bad" handleClick={() => setBad(bad + 1)}></Button>
    <Statistics text="statistics" good={good} bad={bad} neutral={neutral}></Statistics>
  </div>)

}
const Button = (props) => {

  return <button onClick={props.handleClick}>{props.text}</button>
}
const StatisticsLine = (props) => {

  return <Display text={props.text} count={props.count}></Display>

}
const Display = (props) => {

  return <tr>{props.text} {props.count}</tr>
}

const Statistics = (props) => {

  const calculateTotal = (good, bad, neutral) => (good + bad + neutral)
  const calculateAverage = (good, bad, neutral) => (good + bad + neutral) / 3
  const calculatePositive = (good, bad, neutral) => {
    var percent = (good / (good + bad + neutral) * 100)
    return percent + "%"
  }
  if (calculateTotal(props.good, props.neutral, props.bad) == 0) {
    return <div>
      <h3> {props.text}</h3>
      <p>No feedback given</p></div>
  }

  return <table><thead><h3> {props.text}</h3></thead>
    <StatisticsLine text="good" count={props.good}></StatisticsLine>
    <StatisticsLine text="neutral" count={props.neutral}></StatisticsLine>
    <StatisticsLine text="bad" count={props.bad}></StatisticsLine>
    <StatisticsLine text="all" count={calculateTotal(props.good, props.neutral, props.bad)}></StatisticsLine>
    <StatisticsLine text="average" count={calculateAverage(props.good, props.neutral, props.bad)}></StatisticsLine>
    <StatisticsLine text="positive" count={calculatePositive(props.good, props.neutral, props.bad)}></StatisticsLine></table>



}

export default App
