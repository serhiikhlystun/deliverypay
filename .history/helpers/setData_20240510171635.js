const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHQL;

const setData = async (mutation, data = {}, additionalPath = '', token) => {
  const query = JSON.stringify({
    query: mutation,
    variables: data,
  });

  let headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
  }

  const response = await fetch(`${graphQLAPI}${additionalPath}`, {
    headers,
    method: 'POST',
    body: query,
  });

  const responseJson = await response.json();
  return responseJson.data;
};

export default setData;
