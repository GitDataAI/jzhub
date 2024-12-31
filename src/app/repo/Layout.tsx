import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {RepoModel} from "../../lib/model/RepoModel.tsx";
import { RepoApi } from "../../lib/api/RepoApi.tsx";
import RootHeader from "../../component/root/RootHeader.tsx";
import RepoHeader from "../../component/repo/RepoHeader.tsx";
import {Outlet} from "react-router-dom";

const RepoLayout = () => {
    const { owner, repo } = useParams();
    const [Loading, setLoading] = useState(true);
    const [ RepoModel, setRepoModel ] = useState<RepoModel | null>(null)
    const [NotFound, setNotFount] = useState(false);
    const repo_api = new RepoApi();
    useEffect(()=>{
       console.log(owner,repo);
       if (owner && repo){
           repo_api.RepoInfo(owner,repo)
               .then(res=>{
                   if (res.data.code === 200){
                       if (res.data.data){
                           setRepoModel(res.data.data)
                           setLoading(false)
                       }else {
                           setLoading(false)
                           setNotFount(true)
                       }
                   }else {
                       setLoading(false)
                       setNotFount(true)
                   }
               })
       }else {
           setLoading(false)
           setNotFount(true)
       }
    },[])
    if (NotFound){
        return(
            <div>Not Found</div>
        )
    }
    return(
        <>
            <RootHeader/>
            {
                Loading ? (
                    <div>Loading</div>
                ) : (
                    <div className="repo">
                        {
                            RepoModel ? (
                                <div>
                                    <RepoHeader {...RepoModel}/>
                                    <div className="repo-content">
                                        <Outlet/>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    Not Found
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default RepoLayout