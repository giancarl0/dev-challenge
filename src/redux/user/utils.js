import { reqresApi } from 'utils/apis';

async function getUserData() {
  let userRequest = await reqresApi.get('/users');
  if (userRequest.status === 200) {
    return userRequest.data;
  }
  return null;
}

async function updateUserData(id, updates) {
  //const userRequest = await reqresApi.put(`/users/${id}`, updates);
  const userRequest = updateSimulation(`/users/${id}`, updates);
  if (userRequest.status === 200) {
    return userRequest.status;
  }
  return null;
}

async function updateSimulation(api, updates) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.info(`Simulating update for api:${api} with updates:`, updates);
  return { status: 200 };
}

export default {
  getUserData,
  updateUserData,
};
