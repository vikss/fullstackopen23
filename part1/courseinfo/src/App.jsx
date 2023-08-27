import { useState } from 'react'


const App = () => {
  const course = {

    name: 'Half Stack application development',
    parts: [{
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
    ]
  }

  return (<div>
    <Header course={course}></Header>
    <Content course={course}></Content>
    <Total course={course}></Total>
  </div>)

}
const Header = (props) => {
  console.log(props)
  return <h1>{props.course.name}</h1>


}
const Content = ({ course }) => {

  const parts = course.parts
  console.log(parts)
  return <div>
    <Part part={parts[0].name} exercise={parts[0].exercises} />
    <Part part={parts[1].name} exercise={parts[1].exercises} />
    <Part part={parts[2].name} exercise={parts[2].exercises} />
  </div>

}
const Part = (props) => {


  return <p>{props.part} {props.exercise}</p>
}

const Total = ({ course }) => {
  const parts = course.parts
  return <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>

}
export default App
