import React, { useState } from "react"

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button'


const Client = (client) => {

    const [isVaccinated, setIsVaccinated] = useState(client.isVaccinated)
    const [loading, setLoading] = useState(false)

    const clientName = client.name

    const apiUrlPost = "https://demoapi.com/api/vet/pets/"

    const postData = async () => {
        const bodyObject = {
            name: { clientName },
            isVaccinated: { isVaccinated }
        }
        const bodyJson = JSON.stringify(bodyObject)
        const response = await fetch(apiUrlPost, { method: "POST", body: bodyJson })
        return response
    }

    const buttonHandler = async () => {
        setIsVaccinated(!isVaccinated)
        setLoading(true)
        const response = await postData()
        setLoading(false)
    }


    return (
        <section>
            <p>name: {clientName}</p>
            {(loading) ?
                "..." :
                <p>
                    "Vaccinated: " + {isVaccinated}
                </p>
            }

            <Button
                variant="contained"
                onClick={buttonHandler}
            >
                Vaccinated?
            </Button>
        </section>
    )
}

export default Client