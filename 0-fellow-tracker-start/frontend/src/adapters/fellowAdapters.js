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
  const [fellow, error] = await handleFetch(`/api/fellows/${id}`);
  if (error) {
    console.error(`Error fetching fellow with ID ${id}`, error);
    return null;
  }
  return fellow;
}

export const createFellow = async (fellowName) => {
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ fellowName })
  }

  const [newFellow, error] = await handleFetch(`/api/fellows/`, options);

  if (error) {
    console.error("Error creating a fellow:", error);
    return null;
  }

  return newFellow;
}

export const deleteFellow = async (id) => {
  const options = {
    method: "DELETE",
  };
  const [deletedFellow, error] = await handleFetch(`/api/fellows/${id}`, options);

  if (error) {
    console.error(`Error deleting fellow with ID ${id}`, error);
    return null;
  }

  return deletedFellow;
}

export const updateFellowName = async (id, fellowName) => {
  const options = {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ fellowName })
  };

  const [updatedFellow, error] = await handleFetch(`/api/fellows/${id}`, options);

  if (error) {
    console.error(`Error updating fellow with ID ${id}`, error);
    return null;
  }

  return updatedFellow;
}