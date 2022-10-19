import "./App.css"
import { useState, useEffect } from "react"
import Axios from "axios"
import User from './components/User'

function App() {
  const [listOfUsers, setListOfUsers] = useState([])
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [username, setUsername] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data)
    })
  }, [])

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      name,
      age,
      username,
    }).then((response) => {
      setListOfUsers([
        ...listOfUsers,
        {
          name,
          age,
          username,
        },
      ])
    })
  }

  return (
    <div className="App">
      <div>
        <h1>List of Users</h1>
        <div className="grid">
        {listOfUsers.map((user) => {
          return (
            <div>
              <User user={user} />
            </div>
          )
        })}
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {setName(event.target.value)}}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {setAge(event.target.value)}}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {setUsername(event.target.value)}}
        />
        <button onClick={createUser}> Create User </button>
      </div>
    </div>
  )
}

export default App;
