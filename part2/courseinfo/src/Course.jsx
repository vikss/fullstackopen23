const Course = ({ course }) => {

  return <div key={course.id}>
    <Header course={course}></Header>
    <Content course={course}></Content>
    <Total course={course}></Total>

  </div>

}
const Header = (props) => {
  console.log("Props in header is ", props.course.name)
  return <h1>{props.course.name}</h1>


}
const Part = (props) => {
  console.log("In part, props is ", props)
  const part = props.part

  return <li>{part.name} {part.exercises}</li>
}
const Content = ({ course }) => {

  const parts = course.parts
  console.log("Parts obj is ", parts)
  return <ul>
    {

      parts.map(p => {
        return <Part key={p.id} part={p}></Part>
      })


    }

  </ul>

}
const Total = ({ course }) => {
  const parts = course.parts
  const total = parts.reduce((total, p) => total + p.exercises, 0)
  return <p><b>total of {total} exercises</b></p>

}

export default Course