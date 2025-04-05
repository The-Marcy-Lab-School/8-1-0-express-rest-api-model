import handleFetch from "./handleFetch"

export const getAllFellows = async () => {
  const [allFellows, error] = await handleFetch('/api/fellows/')
  return [allFellows, error];
}

export const getFellowById = async (id) => {

}

export const createFellow = async (fellowName) => {
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ fellowName }) // make sure this object matches req.body on the server
  }

  const [newFellow, error] = await handleFetch(`/api/fellows/`, options);
  return [newFellow, error];
}

export const deleteFellow = async (id) => {

}

export const updateFellowName = async (id, fellowName) => {

}