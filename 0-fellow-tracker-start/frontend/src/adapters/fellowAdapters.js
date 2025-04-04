import handleFetch from "./handleFetch"

export const getAllFellows = async () => {
  const [allFellows, error] = await handleFetch('/api/fellows/')
  if (error) {
    console.error("Error fetching fellows:", error);
    return [];
  }
  return allFellows;
}

export const getFellowById = async (id) => {

}

export const createFellow = async (fellowName) => {

}

export const deleteFellow = async (id) => {

}

export const updateFellowName = async (id, fellowName) => {

}