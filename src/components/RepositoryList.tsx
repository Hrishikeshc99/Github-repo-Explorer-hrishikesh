import React from 'react';
import { Repository } from '@/types/github';
import RepositoryCard from './RepositoryCard';

interface RepositoryListProps {
  repositories: Repository[];
}

export default function RepositoryList({ repositories }: RepositoryListProps) {
  if (repositories.length === 0) {
    return (
      <div className="empty-state">
        <p>No repositories found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="repo-list">
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
