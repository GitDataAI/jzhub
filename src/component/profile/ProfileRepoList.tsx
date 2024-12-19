import RepositoryCard from "@/component/profile/ProfileRepoIdCard.tsx";
import {useState} from "react";
import {RepoModel} from "@/api/dto/RepoDto.tsx";
import {useUser} from "@/store/useUser.tsx";
import {useNavigate} from "react-router-dom";

const ProfileRepoList = () => {
    const user = useUser();
    const nav = useNavigate();
    const [RepoList, setRepoList] = useState<RepoModel[]>(user.OwnRepo);
    useUser.subscribe((data)=>{
        setRepoList(data.OwnRepo)
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