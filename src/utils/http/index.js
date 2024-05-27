import axios from "axios"

export const baseURL = process.env.REACT_APP_PUBLIC_API_BASE_ENDPOINT

export const http = axios.create({ baseURL })

http.interceptors.request.use(request => {
  const token = localStorage.getItem("access_token")
  if (token && request.headers) {
    request.headers.Authorization = "Bearer " + token
  }
  return request
})

http.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 401) {
      localStorage.clear()
      if (window.location.pathname !== "/auth/login") {
        return (window.location.href = "/auth/login")
      }
    }
    return Promise.reject(error)
  }
)

export const fetchGetRequest = (endpoint, extraConfig = {}) => {
  return http.get(endpoint, { ...extraConfig }).catch(error => {
    return Promise.reject(error.response)
  })
}

export const fetchPostRequest = (endpoint, payload = {}, extraConfig = {}) => {
  return http.post(endpoint, payload, { ...extraConfig }).catch(error => {
    return Promise.reject(error.response)
  })
}

export const fetchMultipartPostRequest = (
  endpoint,
  payload = {},
  extraConfig = {}
) => {
  return http
    .post(endpoint, payload, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      ...extraConfig
    })
    .catch(error => {
      return Promise.reject(error.response)
    })
}

export const fetchPutRequest = (endpoint, payload = {}, extraConfig = {}) => {
  return http.put(endpoint, payload, { ...extraConfig }).catch(error => {
    return Promise.reject(error.response)
  })
}

export const fetchMultipartPutRequest = async (
  endpoint,
  payload = {},
  extraConfig = {}
) => {
  try {
    return await http.put(endpoint, payload, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      ...extraConfig
    })
  } catch (error) {
    return Promise.reject(error.response)
  }
}

export const fetchPatchRequest = (endpoint, payload = {}, extraConfig = {}) => {
  return http.patch(endpoint, payload, { ...extraConfig }).catch(error => {
    return Promise.reject(error.response)
  })
}

export const fetchMultipartPatchRequest = async (
  endpoint,
  payload = {},
  extraConfig = {}
) => {
  try {
    return await http.patch(endpoint, payload, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      ...extraConfig
    })
  } catch (error) {
    return Promise.reject(error.response)
  }
}

export const fetchDeleteRequest = (endpoint, extraConfig = {}) => {
  return http.delete(endpoint, { ...extraConfig }).catch(error => {
    return Promise.reject(error.response)
  })
}

