import { LayoutSidebar } from "@/component/layout/Sidebar.tsx";
import Repository from "./Repository.tsx";
import NullRepository from "../Repos/NullRepository.tsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


/// Deprecated, Please use RepoLayout instead
const RepositoryLayout = () => {
  const { name } = useParams<{ name?: string }>(); // name could be undefined

  const mockData: Record<
    string,
    {
      name: string;
      description: string;
      stars: number;
      forks: number;
      language: string;
    }[]
  > = {
    alice: [
      {
        name: "repo1",
        description: "Repo 1 description",
        stars: 120,
        forks: 30,
        language: "JavaScript",
      },
      {
        name: "repo2",
        description: "Repo 2 description",
        stars: 50,
        forks: 12,
        language: "Python",
      },
      {
        name: "repo3",
        description: "Repo 3 description",
        stars: 200,
        forks: 45,
        language: "TypeScript",
      },
      {
        name: "repo4",
        description: "Repo 4 description",
        stars: 85,
        forks: 20,
        language: "Ruby",
      },
    ],
    bob: [],
  };

  // If name is undefined, default to an empty array
  const [repositories, setRepositories] = useState(
    name && mockData[name] ? mockData[name] : [] // Check if name is defined
  );

  useEffect(() => {
    if (name) {
      setRepositories(mockData[name] || []);
    } else {
      setRepositories([]); // In case name is undefined
    }
  }, [name]); // Only depend on 'name' here

  return (
    <>
      <LayoutSidebar />
      <div className="layout-content-main">
        {repositories.length > 0 ? (
          <Repository repositories={repositories} />
        ) : (
          <NullRepository />
        )}
      </div>
    </>
  );
};

export default RepositoryLayout;
