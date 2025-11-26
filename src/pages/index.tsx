import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const router = useRouter();

  const handleSearch = (username: string) => {
    if (username.trim()) {
      router.push(`/user/${username}`);
    }
  };

  return (
    <>
      <Head>
        <title>GitHub Repository Explorer</title>
        <meta name="description" content="Search and explore GitHub repositories" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        <header className="header">
          <h1 className="title">GitHub Repository Explorer</h1>
        </header>

        <div className="home-content">
          <div className="welcome-section">
            <p className="welcome-description">
              Search for any GitHub user and explore their public repositories with advanced sorting and filtering options.
            </p>
          </div>

          <SearchBar onSearch={handleSearch} />

        </div>
      </div>
    </>
  );
}
