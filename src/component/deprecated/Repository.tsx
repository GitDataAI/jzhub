import React, { useState } from "react";

interface RepositoryProps {
  repositories: {
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
  }[];
}

const Repository: React.FC<RepositoryProps> = ({ repositories }) => {
  // State for the search input and filter selections
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedStars, setSelectedStars] = useState("");
  const [selectedForks, setSelectedForks] = useState("");

  // Handle input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleStarsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStars(e.target.value);
  };

  const handleForksChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedForks(e.target.value);
  };

  // Filter repositories based on the search term and filters
  const filteredRepositories = repositories.filter((repo) => {
    return (
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLanguage ? repo.language === selectedLanguage : true) &&
      (selectedStars ? repo.stars >= parseInt(selectedStars) : true) &&
      (selectedForks ? repo.forks >= parseInt(selectedForks) : true)
    );
  });

  return (
    <div className="repository-list">
      {/* Search and filter bar */}
      <div className="repository-search-bar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-container">
          <select value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="">All Languages</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            {/* Add more languages as needed */}
          </select>

          <select value={selectedStars} onChange={handleStarsChange}>
            <option value="">All Stars</option>
            <option value="1">1+</option>
            <option value="10">10+</option>
            <option value="50">50+</option>
            <option value="100">100+</option>
            {/* Add more star filters as needed */}
          </select>

          <select value={selectedForks} onChange={handleForksChange}>
            <option value="">All Forks</option>
            <option value="1">1+</option>
            <option value="10">10+</option>
            <option value="50">50+</option>
            <option value="100">100+</option>
            {/* Add more fork filters as needed */}
          </select>
        </div>
      </div>

      {/* Repository list */}
      <ul>
        {filteredRepositories.map((repo) => (
          <li className="repository-item" key={repo.name}>
            <div className="repo-header">
              <h3 className="repo-name">{repo.name}</h3>
              <span className="repo-language">{repo.language}</span>
            </div>
            <p className="repo-description">{repo.description}</p>
            <div className="repo-stats">
              <span className="repo-stars">⭐ {repo.stars}</span>
              <span className="repo-forks">🍴 {repo.forks}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Repository;
