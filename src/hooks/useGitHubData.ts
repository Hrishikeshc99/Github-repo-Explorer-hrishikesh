import { useState, useEffect } from 'react';
import { Repository, FetchState } from '@/types/github';

export function useGitHubData(username: string) {
  const [state, setState] = useState<FetchState<Repository[]>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!username.trim()) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    const fetchRepositories = async () => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );

        if (response.status === 404) {
          setState({
            data: null,
            loading: false,
            error: 'User not found. Please check the username and try again.',
          });
          return;
        }

        if (response.status === 403) {
          setState({
            data: null,
            loading: false,
            error: 'GitHub API rate limit exceeded. Please try again later.',
          });
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const data: Repository[] = await response.json();
        setState({ data, loading: false, error: null });
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : 'An unexpected error occurred',
        });
      }
    };

    fetchRepositories();
  }, [username]);

  return state;
}
