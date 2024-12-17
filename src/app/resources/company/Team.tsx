import React, { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface TeamMemberProps {
  name: string;
  description: string;
  github: string;
}

interface ContributorProps {
  image: string;
  github: string;
}

const Team: React.FC = () => {
  useEffect(() => {
    document.title = "JZHub | Team";
  }, []);
  const { t } = useTranslation("Team");

  const teamMembers: TeamMemberProps[] = [
    {
      name: t("member1"),
      description: t("member1Des"),
      github: "https://github.com/taoshengshi",
    },
    {
      name: t("member2"),
      description: t("member2Des"),
      github: "https://github.com/hunjixin",
    },
    {
      name: t("member3"),
      description: t("member3Des"),
      github: "https://github.com/Brownjy",
    },
    {
      name: t("member4"),
      description: t("member4Des"),
      github: "https://github.com/TsumikiQAQ",
    },
  ];

  const githubContributors: ContributorProps[] = [
    {
      image: "https://avatars.githubusercontent.com/u/150743559?v=4",
      github: "https://github.com/lazhenyi",
    },
    {
      image: "https://avatars.githubusercontent.com/u/135498154?v=4",
      github: "https://github.com/xiaoyutongxue11",
    },
    {
      image: "https://avatars.githubusercontent.com/u/157772574?v=4",
      github: "https://github.com/jzhub001",
    },
  ];

  const TeamMember: React.FC<TeamMemberProps> = ({
    name,
    description,
    github,
  }) => (
    <div className="mb-10">
      <h3 className="text-2xl text-primary font-bold mb-3">{name}</h3>
      <p className="text-md text-body-color mb-3">{description}</p>
      <Link to={github} aria-label={`${name}'s GitHub`}>
        <FaGithub className="text-primary" />
      </Link>
    </div>
  );

  const Contributor: React.FC<ContributorProps> = ({ image, github }) => (
    <Link to={github} aria-label="GitHub Contributor">
      <img
        src={image}
        alt="Contributor"
        className="w-8 h-8 object-cover rounded-full"
      />
    </Link>
  );

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-7">
        <div className="sm:col-span-7 md:col-span-7 lg:col-span-6">
          <div className="flex flex-wrap gap-6 lg:flex-nowrap">
            <div className="w-full lg:w-2/3">
              <h3 className="text-3xl text-primary font-bold mb-7">
                {t("title")}
              </h3>
              {teamMembers.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  description={member.description}
                  github={member.github}
                />
              ))}
            </div>

            <div className="w-full lg:w-1/3 lg:pt-16">
              <h3 className="text-2xl text-primary font-bold sm:mb-3">
                {t("contributor")}
              </h3>
              <p className="text-md text-body-color">{t("contributorDes")}</p>
              <div className="flex flex-wrap gap-4 mt-4">
                {githubContributors.map((contributor, index) => (
                  <Contributor
                    key={index}
                    image={contributor.image}
                    github={contributor.github}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
