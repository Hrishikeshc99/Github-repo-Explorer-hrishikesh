import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SearchBar from '@/components/SearchBar';
import FilterControls from '@/components/FilterControls';
import RepositoryList from '@/components/RepositoryList';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import RateLimitIndicator from '@/components/RateLimitIndicator';
import { useGitHubData } from '@/hooks/useGitHubData';
import { SortOption } from '@/types/github';

export default function UserPage() {
  const router = useRouter();
  const { username } = router.query;
  const [sortBy, setSortBy] = useState<SortOption>('stars');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const usernameString = typeof username === 'string' ? username : '';
  const { data: repositories, loading, error } = useGitHubData(usernameString);

  const languages = useMemo(() => {
    if (!repositories) return [];
    const langSet = new Set<string>();
    repositories.forEach((repo) => {
      if (repo.language) {
        langSet.add(repo.language);
      }
    });
    return Array.from(langSet).sort();
  }, [repositories]);

  const filteredAndSortedRepos = useMemo(() => {
    if (!repositories) return [];

    let filtered = repositories;

    if (selectedLanguage) {
      filtered = repositories.filter((repo) => repo.language === selectedLanguage);
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'updated':
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [repositories, sortBy, selectedLanguage]);

  const handleSearch = (searchUsername: string) => {
    if (searchUsername.trim()) {
      router.push(`/user/${searchUsername}`);
    }
  };

  return (
    <>
      <Head>
        <title>{usernameString ? `${usernameString} - GitHub Repositories` : 'GitHub Repository Explorer'}</title>
        <meta name="description" content="Explore GitHub repositories" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        <header className="header">
          <h1 className="title">GitHub Repository Explorer</h1>
          <RateLimitIndicator />
        </header>

        <SearchBar onSearch={handleSearch} />

        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && repositories && (
          <>
            <div className="results-header">
              <h2 className="username-title">{usernameString}</h2>
              <p className="repo-count">{repositories.length} repositories</p>
            </div>

            <FilterControls
              sortBy={sortBy}
              onSortChange={setSortBy}
              languages={languages}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />

            <RepositoryList repositories={filteredAndSortedRepos} />
          </>
        )}

        {!loading && !error && !repositories && (
          <div className="welcome-message">
            <h2>Welcome to GitHub Repository Explorer</h2>
            <p>Enter a GitHub username to view their public repositories.</p>
          </div>
        )}
      </div>
    </>
  );
}
