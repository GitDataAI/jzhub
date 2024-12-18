import RepositoryCard from "@/component/profile/ProfileRepoIdCard.tsx";

const ProfileRepoList = () => {
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
                <button className="new-repo-button">新建</button>
            </div>
            <div className="id-card">
                <RepositoryCard/>
            </div>
        </div>
    )
}


export default ProfileRepoList