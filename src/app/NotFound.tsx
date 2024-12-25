import React from "react";
import { TbError404 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const nav = useNavigate();

  return (
    <div className="notfound-container">
      <img
        src="/gitdata.ai.png"
        style={{ width: "50px" }}
        onClick={() => nav("/")}
        alt="GitDataAI"
      />
      <div>
        <TbError404 style={{ fontSize: "200px", fontWeight: "bolder" }} />
      </div>
      <h1 className="notfound-text">
        The page you're going to visit doesn't exist
      </h1>
    </div>
  );
};

export default NotFoundPage;
