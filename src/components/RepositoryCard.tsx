import React from 'react';
import { Repository } from '@/types/github';
import { formatDate, formatNumber } from '@/utils/helpers';
import { FaStar, FaCodeBranch, FaEye } from "react-icons/fa";

interface RepositoryCardProps {
  repo: Repository;
}

export default function RepositoryCard({ repo }: RepositoryCardProps) {
  return (
    <div className="repo-card">
      <div className="repo-header">
        <h3 className="repo-name">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
        </h3>

        {repo.language && (
          <span className="repo-language">{repo.language}</span>
        )}
      </div>

      {repo.description && (
        <p className="repo-description">{repo.description}</p>
      )}

      {/* Stats Section */}
      <div className="repo-stats">

        <div className="stat-item">
          <FaStar className="stat-icon" />
          <span className="stat-value">{formatNumber(repo.stargazers_count)}</span>
        </div>

        <div className="stat-item">
          <FaCodeBranch className="stat-icon" />
          <span className="stat-value">{formatNumber(repo.forks_count)}</span>
        </div>

        <div className="stat-item">
          <FaEye className="stat-icon" />
          <span className="stat-value">{formatNumber(repo.watchers_count)}</span>
        </div>

      </div>

      <div className="repo-footer">
        <span className="repo-updated">Updated {formatDate(repo.updated_at)}</span>
      </div>
    </div>
  );
}
