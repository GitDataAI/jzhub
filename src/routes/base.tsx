import { RouteObject } from "react-router-dom";
import { Layout } from "../app/Layout.tsx";
import RepositoryLayout from "@/app/repository/Layout.tsx";

export const BaseRouter = (): RouteObject[] => {
  return [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <RepositoryLayout />,
        },
        {
          path: "repo/:name",
          element: <RepositoryLayout />,
        },
      ],
    },
  ];
};
