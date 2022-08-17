const model = require('../model')



const getAllDoctors = async (req, res) =>{
  /*
  get request to return all of the doctors in the database
  input: none
  response:
   [
    {
        "docid": 1,
        "firstname": "Gregory",
        "lastname": "House"
    },
    {
        "docid": 2,
        "firstname": "Nicholas",
        "lastname": "Riviera"
    }
  ]
*/
  try {
    const result = await model.getAllDoctors();
    res.status(200).send(result.rows);
  } catch(err){
    res.status(400).send();
  }
}

const getApps = async (req, res) => {
  /*
    get request to get all of the appointments for a specific doctor on a specific date
    params: doctorId, date in the MMDDYYYY format, no '/'
    response:
    [
      {
        "id": 2,
        "patfirstname": "Homer",
        "patlastname": "Simpson",
        "date": "2022-08-18T07:00:00.000Z",
        "time": "14:30:00",
        "kind": "New Patient",
        "docid": 2
      }
    ]
*/
  try{
    //date string will be converted from MMDDYYYY to MM/DD/YYYY
    let date = req.params.date.slice(0,2) +'/'+req.params.date.slice(2,4)+'/'+req.params.date.slice(4)
    const result = await model.getApps(req.params.docID, date)
    res.status(200).send(result.rows)
  } catch(err) {
    console.log(err)
    res.status(400).send()
  }
}

const delApp = async (req, res) => {
  /*
    Delete request to remove an app from a doctor's appointments
    param: docID
    response: none
  */
  try{
    await model.delApp(req.params.appID);
    res.status(410).send();
  } catch(err){
    res.status(400).send();
  }
};

const addApp = async (req,res) => {
  /*
  {
  post request to add appointment for any doctor
  input :{
  'firstName' (for patient): string,
  'lastName' (for patinet): string,
  'date' : string in MM/DD/YYYY format,
  'tiime': string in 00:00 AM/PM format
  'kind': string, either "New Patient" or "Follow-up"
  'docID': integer
  }
  output: none

  possible improvements:
    - use throw new Error instead of using an errorFlag variable
    - split this function up in order to make it more modular

  */
  try{
    //grab payload
    let details = req.body
    let time = Number(details.time.slice(2,4))
    // errorFlag used to make sure appointment requirements are met
    let errorFlag = false
    // check if time is in a 15 minute interval
    // at the moment, the front end must ensure that the time sent does not have a minute's value that is > 59
    if (time%15){
      res.status(400).send('Appointments must be placed in 15 minute intervals.')
      errorFlag = true;
    }
    // check if the doctor already has 3 appointments at that time
    if(!errorFlag){
      let check = await model.countApps(details.docID, details.date, details.time)
      if (check.rows.length >= 3){
        console.log('entered here')
        errorFlag = true;
        res.status(400).send('There are no more appointments for this time slot, please try a different time.')
      }
    }
    // if errorflag is still false, add the appointment
    if(!errorFlag){
      await model.addApp(Object.values(details))
      res.status(201).send()
    }

  }catch(err){
    console.log(err)
    res.status(400).send();
  }
}

module.exports = { getAllDoctors, getApps, delApp, addApp}