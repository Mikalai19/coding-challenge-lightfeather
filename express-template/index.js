const express = require('express')
const axios = require('axios')
const e = require('express')

const app = new express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));



app.get('/api/supervisors', (req, res) => {
    let result = ''
    let new_arr = []
    axios.get("https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers")
        .then(response => {

            const array = response.data
            for (let i = 0; i < array.length; i++) {
                let eachObj = array[i]
                let jurisdiction = eachObj.jurisdiction
                let firstName = eachObj.firstName
                let lastName = eachObj.lastName

                result = `${jurisdiction} - ${lastName} ${firstName}`   // u - Olson Karson

                function containNumber(str) {
                    return /\d/.test(str);
                }
                if (containNumber(result)) {
                    delete result
                } else {
                    new_arr.push(result)
                }
                let sorted = new_arr.sort()
                console.log(sorted)

            }

            res.json({ supervisors: new_arr })

        })
        .catch(err => {
            console.log(err)
        })



})

app.post('/api/submit', async (req, res) => {
    console.log(req.body)
    let lastName = req.body.lastName
    let firstName = req.body.firstName
    let email = req.body.email
    let phoneNumber = req.body.phoneNumber
    let supervisor = req.body.supervisor
    try {
        if (!(lastName) || !(firstName) || !(supervisor)) {
            return res.status(400).json({ message: "lastName, firstName and supervisor required parameters " })
        }
        return res.status(200).json({ message: "Success" })
    }
    catch (e) {
        console.log(e)
        res.json({ message: 'An error occured. Please try again.' })
    }

})


app.listen(8080, () => {
    console.log('Listening on 8080. Ctrl+c to stop this server.')
})