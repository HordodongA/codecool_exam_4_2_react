import React, { useEffect, useState } from "react"
import Client from "./components/Client.jsx"

// MUI imports
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button'
import TextField from '@mui/material/Input'


// API URL
const apiUrlGet = "https://demoapi.com/api/vet/clients?search="


const App = () => {

  // STATES
  // App state
  const [appData, setAppData] = useState([])
  // Input and button state
  const [searchInput, setSearchInput] = useState("")
  const [buttonState, setButtonState] = useState(true)


  // GET data fom API
  const getData = async (url) => {
    const responseJson = await fetch(url)
    const responseObject = await responseJson.json()
    console.log(responseJson)
    console.log(responseJson._bodyText)
    console.log(responseObject)
    console.log(responseObject._bodyText)
    return responseObject                         // ! Üress array jön vissza, innen vakon repültem, de elvileg jó lehet
  }

  // Search button handling function
  const buttonHandler = async () => {
    const urlSearch = apiUrlGet + searchInput
    const response = await getData(urlSearch)
    setAppData(response)
  }

  // Validating function
  const validateInput = (inputValue) => {
    if (inputValue.length > 2) {
      setButtonState(false)
    }
    else {
      setButtonState(true)
    }
  }

  // Init validationg function
  useEffect(() => {
    validateInput(searchInput)
  }, [searchInput])


  return (
    <div>
      <h1>Veterinarian admin - clients</h1>

      <div>
        < TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          type="text"
          placeholder="search"
          value={searchInput}
          onChange={event => setSearchInput(event.target.value)}
        />

        <Button variant="contained" onClick={buttonHandler} disabled={buttonState} >Search</Button>
      </div>

      {appData &&
        appData.map(client => (
          <Client
            key={client.name}
            client={client}
          />
        ))}

    </div>
  )
}

export default App
