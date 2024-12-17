import { GoArrowUpRight } from "react-icons/go";
import React from "react";
import { Link } from "react-router-dom";

const RoadMap = () => {
  React.useEffect(() => {
    document.title = "JZHub | Jobs";
  }, []);

  const reasonData = [
    {
      title: "Work-Life Balance",
      reason: [
        "Flexible working hours",
        "Generous paid time off",
        "Remote-friendly culture",
      ],
    },
    {
      title: "Professional Growth",
      reason: [
        "Access to online courses and certifications",
        "Annual learning budget",
        "Mentorship programs",
      ],
    },
    {
      title: "Competitive Benefits",
      reason: [
        "Health insurance coverage",
        "401(k) matching",
        "Employee stock options",
      ],
    },
  ];

  return (
    <>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-7">
          <div className="sm:col-span-7 md:col-span-7 lg:col-span-6">
            <h1 className="text-3xl text-primary font-bold mb-10">
              Join the GitDataAI Team
            </h1>
            <p className="text-md text-body-color mb-8">
              GitDataAI is a company for developers, by developers. All 3 of our
              founders have spent years in the trenches writing software and
              still do it almost every single day. We know the only way to build
              the world's best code editor is by equipping every single member
              of the team to do the best work of their career.
            </p>
            <h2 className="text-2xl text-primary font-bold mb-6">
              Open Positions
            </h2>
            <div className="flex flex-col gap-1 mb-10">
              <Link
                to="#"
                className="flex items-center gap-1 text-primary decoration-primary/10 underline underline-offset-2"
              >
                Rust Engineer
                <GoArrowUpRight className="text-primary" />
              </Link>
              <Link
                to="#"
                className="flex items-center gap-2 text-primary decoration-primary/10 underline underline-offset-2"
              >
                AI Engineer
                <GoArrowUpRight className="text-primary" />
              </Link>
            </div>
            <h2 className="text-2xl text-primary font-bold mb-6">
              Perks and Benefits
            </h2>
            <p className="text-md mb-3 text-body-color">
              Reasons why we love to work at GitDataAI.
            </p>
            <div className="flex flex-col">
              {reasonData.map((value, index) => (
                <div
                  key={index}
                  className="w-2/3 flex flex-col items-stretch min-h-[100px] rounded-[4px] border border-gray-300 p-4 my-4" // 使用 flex-col 来让内容垂直排列
                >
                  <h4 className="text-primary text-xl mb-3">{value.title}</h4>
                  <ul className="list-disc list-inside text-gray-700 pl-2">
                    {value.reason.map((item, i) => (
                      <li key={i} className="text-body-color">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RoadMap;
