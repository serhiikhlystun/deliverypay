const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHQL;

const fetchData = async (query, variables, additionalPath = '', token) => {

  let headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
  }

  const res = await fetch(`${graphQLAPI}${additionalPath}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors);
  }

  if (json.data.users_me) {
    return json.data.users_me;
  } else return json

};

export default fetchData;
