import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { fetchGraphQL } from './utils/fetchGraphQL';

export const App: FC = () => {
  const [name, setName] = useState<string | null>(null);

  // When the component mounts we'll fetch a repository name
  useEffect(() => {
    let isMounted = true;
    fetchGraphQL(`
      query RepositoryNameQuery {
        # feel free to change owner/name here
        repository(owner: "sochan-dev" name: "gh_sample") {
          name
        }
      }
    `)
      .then((response) => {
        // Avoid updating state if the component unmounted before the fetch completes
        if (!isMounted) {
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { data } = response;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setName(data.repository.name);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div>
      <header>
        <p>{name != null ? `Repository: ${name}` : 'Loading'}</p>
      </header>
    </div>
  );
};
