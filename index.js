const express = require("express")
const controller = require('./controller')

const app = express();

app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))

// since all of the endpoints start with '/doctors', express router would be a good implementation here


//get all doctors
app.get('/doctors', controller.getAllDoctors)

// get all appointments for a doctor on a day
app.get('/doctors/:docID/:date', controller.getApps)

// delete existing appointment from doctor's calendar
app.delete('/doctors/:appID', controller.delApp)

// add a new appointment to a doctor's calendar
app.post('/doctors', controller.addApp)


let port = 5001

app.listen(port, () => {
  console.log(`sever now running on port ${port}`)
})