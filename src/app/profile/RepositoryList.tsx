import {SessionModel} from "../../lib/model/UserModel.tsx";
import {useEffect, useState} from "react";
import {RepoModel} from "../../lib/model/RepoModel.tsx";
import { UsersApi } from "../../lib/api/UsersApi.tsx";
import RepositoryCard from "../../component/repo/RepoIdCard.tsx";

export interface RepositoryListProps{
    model: SessionModel
}



const RepositoryList = (props: RepositoryListProps) => {
    const [RepoList,setRepoList] = useState<RepoModel[]>([]);
    const users_api = new UsersApi();
    useEffect(()=>{
        users_api.UsersRepos(props.model.username)
            .then(res=>{
                if (res.data.code === 200){
                    setRepoList(res.data.data!);
                }else {
                    console.log(res.data.msg);
                }
            })
            .catch(e=>{
                console.log(e);
            })
    },[])
    return(
        <>
            <div>
                <div className="profile-repo-list">
                    {
                        RepoList.map((item,index)=>{
                            return(
                                <RepositoryCard repo={item} key={index}/>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default RepositoryList