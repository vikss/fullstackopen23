import { useState } from 'react'


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <CourseList courses={courses} />

}
const Course = ({ course }) => {

  return <div key = {course.id}>
    <Header course={course}></Header>
    <Content course={course}></Content>
    <Total course={course}></Total>

  </div>

}
const CourseList = ({courses}) =>
{

 return <div>{courses.map(course=><Course key={course.id} course={course}></Course>)}</div>

}
const Header = (props) => {
  console.log("Props in header is ", props.course.name)
  return <h1>{props.course.name}</h1>


}
const Content = ({ course }) => {

  const parts = course.parts
  console.log("Parts obj is ", parts)
  return <ul>
    {

      parts.map(p => {
       return <Part key = {p.id} part={p}></Part>
      })


    }

  </ul>

}
const Part = (props) => {
   console.log("In part, props is ", props)
  const part = props.part

  return <li>{part.name} {part.exercises}</li>
}

const Total = ({ course }) => {
  const parts = course.parts
  const total = parts.reduce((total, p) => total + p.exercises, 0)
  return <p><b>total of {total} exercises</b></p>

}
export default App
