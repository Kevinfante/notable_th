const pool = require('../db.js')

const getAllDoctors = () => {
  let queryString = 'SELECT * FROM doctors'
  return pool.query(queryString)
}

const getApps = (ID, date) => {
  let queryString = 'SELECT * FROM appointments WHERE docID = $1 AND date = $2'
  return pool.query(queryString, [ID, date])
}

const delApp = (ID) => {
  let queryString = 'DELETE FROM appointments WHERE ID  = $1'
  pool.query(queryString, [ID])
}

const countApps = (ID, date, time) => {
  let queryString = 'SELECT * FROM appointments WHERE docID = $1 AND date = $2 AND time = $3'
  return pool.query(queryString, [ID, date, time])
}

const addApp = (info) => {
  // console.log('info: ', info)
  let queryString = 'INSERT INTO appointments (patFirstName, patLastName, date, time, kind, docID) VALUES ($1, $2, $3, $4, $5, $6)'
  pool.query(queryString, info)
}

module.exports = { getAllDoctors, getApps, delApp, countApps, addApp}