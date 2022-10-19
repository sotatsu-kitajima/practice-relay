export const fetchGraphQL = async (text: string, variables?: string | undefined) => {
  const { REACT_APP_GITHUB_AUTH_TOKEN } = process.env;

  // Fetch data from GitHub's GraphQL API:
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${REACT_APP_GITHUB_AUTH_TOKEN || ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return response.json();
};
