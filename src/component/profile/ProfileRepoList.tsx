import RepositoryCard from "@/component/profile/ProfileRepoIdCard.tsx";
import {useState} from "react";
import {useUser} from "@/store/useUser.tsx";
import {useNavigate} from "react-router-dom";
import {GraphQLUserModel, GraphQLUserRepo} from "@/api/graphql/user/Struct.tsx";


export interface ProfileRepoListProps{
    user: GraphQLUserModel
}
const ProfileRepoList = (props: ProfileRepoListProps) => {
    const nav = useNavigate();
    const [RepoList, setRepoList] = useState<GraphQLUserRepo[]>(props.user!.repo!);
    useUser.subscribe((data)=>{
        setRepoList(data.user!.repo!)
    })
    return(
        <div className="profile-dashboard">
            <div className="repository-search">
                <input
                    type="text"
                    placeholder="搜索仓库..."
                    className="search-input"
                />
                <select className="select-type">
                    <option value="">类型</option>
                    {/* TODO */}
                </select>
                <select className="select-language">
                    <option value="">语言</option>
                    {/* TODO */}
                </select>
                <select className="select-sort">
                    <option value="">排序</option>
                    {/* TODO */}
                </select>
                <button onClick={()=>{
                    nav("/new/repo")
                }} className="new-repo-button">新建</button>
            </div>
            <div className="id-card">
                {
                    RepoList?.map(repo=>{
                        return <RepositoryCard key={repo.uid} repo={repo}/>
                    })
                }
            </div>
        </div>
    )
}


export default ProfileRepoList