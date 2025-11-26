export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  forks_count: number;
  watchers_count: number;
  created_at: string;
}

export interface User {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
}

export interface RateLimitResponse {
  resources: {
    core: RateLimit;
    search: RateLimit;
  };
  rate: RateLimit;
}

export type SortOption = 'stars' | 'updated' | 'name';

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
