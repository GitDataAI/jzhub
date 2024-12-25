import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutHeader } from "@/component/layout/Header.tsx";
import ProfileHeader from "@/component/profile/ProfileHeader.tsx";
import { useInfo } from "@/store/useInfo.tsx";
import ProfileInfo from "@/component/profile/ProfileInfo.tsx";
import ProfileDashBoard from "@/component/profile/ProfileDashBorad.tsx";
import ProfileRepoList from "@/component/profile/ProfileRepoList.tsx";
import { UserGraphql } from "@/api/graphql/user/Handler.tsx";
import { GraphQLUserModel } from "@/api/graphql/user/Struct.tsx";
import NotFoundPage from "./NotFound";

const ProfileLayout = () => {
  const { username } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const info = useInfo();
  const user_graphql = new UserGraphql();
  const [user_data, setUser_data] = useState<GraphQLUserModel | null>(null);
  const [Load, setLoad] = useState(false);
  const [NotFound, setNotFound] = useState(false);
  useEffect(() => {
    user_graphql
      .Query({
        username: username!,
        profile: true,
        repo: true,
        data: true,
        keys: true,
        email: true,
        groups: true,
      })
      .then((res) => {
        if (res.status === 200 && res.data.code === 200) {
          setUser_data(res.data.data!);
          if (!tab) {
            setSearchParams({ tab: "dashboard" });
          }
          console.log(username);
          info.setHref({
            label: username!,
            url: `/${username!}?tab=dashboard`,
          });
          setLoad(true);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        setNotFound(true);
      });
  }, []);
  // TODO 404
  if (NotFound) {
    return (
      <>
        <LayoutHeader />
        <NotFoundPage />
      </>
    );
  }
  return (
    <>
      {Load ? (
        <>
          <LayoutHeader />
          <ProfileHeader username={username!} tab={tab!} />
          <div className="profile-container">
            <ProfileInfo ov={user_data!} />
            {tab === "dashboard" ? (
              <>
                <ProfileDashBoard />
              </>
            ) : null}
            {tab === "repo" ? <ProfileRepoList user={user_data!} /> : null}
          </div>
        </>
      ) : null}
    </>
  );
};

export default ProfileLayout;
