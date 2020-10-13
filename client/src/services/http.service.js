import axios from 'axios'

const API_ENDPOINT = 'http://localhost:5000/api'

const handleRequest = async(methodType, url, data, config) => {
  url = API_ENDPOINT+url
  if(methodType === 'GET') {
    try{
      let resp = await axios.get(url, config)
      return await handleResponse(resp)
    } catch (e) {
      throw e;
    }
  }
  else if (methodType === 'POST') {

    console.log(data)
    try{
      let resp = await axios.post(url, data, config)
      return await handleResponse(resp)
    } catch (e) {
      throw e;
    }
  }
}

const handleResponse = async(resp) => {
  let  { status } = resp
  if(status === 401) {
    console.log(`logged out`)
    await handleLogout()
  } else if (status === 200 || status === 201) {
    return resp.data
  } else if (status === 500) {
    await handleServerError()
  }

}

const handleLogout = async() => {
  console.log("log out handled")
}

const handleServerError = async() => {
  // redirect to error page
  console.log("We shall redirect to error page here")
}

export default handleRequest