import axios from 'axios'
const baseUrl = 'http://localhost:3000/persons'

const getAll = () => {
   const request = axios.get(baseUrl)
   return request.then(response => {
      console.log(response.data)
      return response.data

   })
}

const addEntry = (obj) => {

   return axios.post(baseUrl, obj).then(res => {

      console.log(res)
      return res.data

   })

}

const editEntry = (id, obj) => {

   return axios.put(`${baseUrl}/${id}`, obj).then(res => {

      console.log(res)
      return res

   })


}
const deleteEntry = (id) => {

   return axios.delete(`${baseUrl}/${id}`).then(res => {
      console.log(res)
      return res

   }

   ).catch(error => {
      console.log(error)
      return error.response
   })

}



export default { getAll, addEntry, deleteEntry, editEntry }
