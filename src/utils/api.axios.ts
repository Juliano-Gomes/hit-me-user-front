import axios from 'axios'

export const ax = axios.create({
    baseURL:"http://localhost:4454/File",
    headers:{
        "Content-Type":"multipart/form-data"
    }
})
export const Log= axios.create({
    baseURL:"http://localhost:4454/",
    headers:{
        "Content-Type": "application/json",
    }
})
