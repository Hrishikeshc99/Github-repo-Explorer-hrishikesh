# GitHub Repository Explorer

A modern, single-page application built with Next.js and TypeScript that allows users to search for GitHub usernames and explore their public repositories with advanced sorting and filtering capabilities.

## Features

- **Smart Search**: Search for any GitHub user with debounced input to optimize API calls
- **Advanced Sorting**: Sort repositories by stars, last updated date, or name (alphabetically)
- **Language Filtering**: Filter repositories by programming language
- **Real-time Data**: View live repository statistics including stars, forks, and watchers
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Rate Limit Monitoring**: Visual indicator showing remaining API requests
- **Client-side Routing**: Deep linking support with URL-based navigation

## Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS3 with modern gradients and animations
- **API**: GitHub REST API v3

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd github-repo-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## TypeScript Interfaces

### Repository Interface

```typescript
interface Repository {
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

## State Management Approach

This application uses a combination of React hooks and local component state for state management:

1. **Custom Hook (useGitHubData)**: Encapsulates all data fetching logic for repositories, managing three distinct states:

   - Loading state during API calls
   - Success state with fetched data
   - Error state with appropriate error messages

2. **Local Component State**: Used for UI-specific state like:

   - Sort preferences
   - Filter selections
   - Search input values

3. **URL State**: The username is stored in the URL for deep linking and shareability

This approach was chosen because:

- The application has straightforward state requirements
- No global state needs to be shared across unrelated components
- Custom hooks provide excellent code reusability and separation of concerns
- Built-in React features are sufficient without adding external dependencies

## API Endpoints Used

1. **User Repositories**: `GET /users/{username}/repos`

   - Fetches all public repositories for a given user
   - Returns up to 100 repositories per request

2. **Rate Limit**: `GET /rate_limit`
   - Monitors remaining API requests
   - Updates every 60 seconds

## Features Implementation

### Custom Hook

The `useGitHubData` hook handles all data fetching with proper error handling for:

- 404 errors (user not found)
- 403 errors (rate limit exceeded)
- Network errors

### Sorting

Repositories can be sorted by:

- **Stars**: Descending order by stargazers_count
- **Last Updated**: Most recently updated first
- **Name**: Alphabetical order

### Filtering

Filter repositories by programming language with a dynamic dropdown populated from the fetched repositories.

### Debounced Search

Search input uses a 500ms debounce to prevent unnecessary API calls while typing.

### Error Handling

Comprehensive error handling for:

- User not found (404)
- Rate limit exceeded (403)
- Network failures
- Invalid responses# Github-repo-Explorer-hrishikesh
Search for any GitHub user and explore their public repositories with advanced sorting and filtering options.
