/* global localStorage */

import axios from 'axios'

const API_URL = process.env.API_URL || 'http://codeci.pp.ua/api';

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.token
  }
})
