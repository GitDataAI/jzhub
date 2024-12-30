import {RepoApi} from "../../lib/api/RepoApi.tsx";
import {useEffect, useState} from "react";
import {RepoCreateOptions, RepoCreateOwnerList} from "../../lib/model/RepoModel.tsx";
import {toast} from "@pheralb/toast";
import {Button, Group, Radio, Select, TextInput} from "@mantine/core";
import useUser from "../../store/useUser.tsx";
import {useNavigate} from "react-router";

const RepositoryNew = () => {
    const repo_api = new RepoApi();
    const nav = useNavigate();
    const user = useUser();
    const [OwnerList, setOwnerList] = useState<RepoCreateOwnerList[]>([])
    const [CreateReadme, setCreateReadme] = useState(false);
    const [Owner, setOwner ] = useState("")
    const [OwnerErr, setOwnerErr] = useState(false);

    useEffect(()=>{
        if (user.user){
            setOwner(user.user.username)
        }else {
            toast.error({
                text: "请先登录",
            })
            nav("/auth/login")
        }
       repo_api.CreateOwnerList()
           .then(res=>{
               if (res.data.code === 200){
                   setOwnerList(res.data.data!)
               }else {
                   toast.error({
                       text: "获取用户列表失败",
                   })
               }
           })
    },[])
    const [RepoNameOk,setRepoNameOk] = useState(false);

    const [Data, setData] = useState<RepoCreateOptions>({
        owner: user.user!.username,
        owner_id: user.user!.uid,
        is_group: false,
        private: false,
        name: "",
        description: "",
        add_readme: false
    });
    const CheckRepoName = (name:string) => {
        repo_api.CheckRepoName(Owner,name)
            .then(res=>{
                if (res.data.code === 200){
                    if (res.data.data){
                        setRepoNameOk(false)
                    }else {
                        setRepoNameOk(true)
                    }
                }else {
                    setRepoNameOk(false)
                    toast.error({
                        text: "Repository name is not available",
                    })
                }
            })
    }
    const Commit = () => {
        if (!Data.name){
            toast.error({
                text: "Repository name is required",
            })
            return
        }
        if (RepoNameOk){
            toast.error({
                text: "Repository name is not available",
            })
            return
        }
        if (Data.owner === ""){
            toast.error({
                text: "Repository owner is required",
            })
            return
        }
        if (Data.owner_id === ""){
            toast.error({
                text: "Repository owner id is required",
            })
            return
        }
        repo_api.CreateRepo(Data)
            .then(res=>{
                if (res.data.code === 200){
                    toast.success({
                        text: "Repository created successfully",
                    })
                    nav(`/${Owner}/${Data.name}`)
                }else {
                    toast.error({
                        text: "Repository created failed",
                    })
                }
            })
    }
    return (
        <>
            <div className="new-title">
                <h1>
                    Create a new repository
                </h1>
                <span>
                    A repository contains all project files, including the revision history. Already have a project repository elsewhere?
                </span>
            </div>
            <hr/>
            <div className="new-content">
                <div>
                    Required fields are marked with an asterisk (*).
                    <div className="new-content-owner">
                        <Select label="owner" value={Owner} defaultValue={Owner} error={OwnerErr ? "Required" : ""} onChange={(x)=>{
                            if (x) {
                                setOwner(x)
                                setData({
                                    ...Data,
                                    owner: x,
                                    owner_id: OwnerList.find(y=>y.name === x)!.uid
                                })
                            }
                            if (x === ""){
                                setOwnerErr(true)
                            }else {
                                setOwnerErr(false)
                            }
                        }} name="owner" id="owner"
                                data={OwnerList.map(x => {
                                    return x.name
                                })}/>
                        <TextInput
                            onBlur={(x)=>{
                                CheckRepoName(x.target.value)
                            }}
                            onChange={(x)=>{
                                setData({
                                    ...Data,
                                    name: x.target.value
                                })
                            }}
                            label="Repository Name"
                        />
                    </div>
                </div>
                {
                    RepoNameOk ? (
                        <div>
                            <a style={{
                                color: "red"
                            }}>
                                Repository name is not available
                            </a>
                        </div>
                    ):null
                }
                <TextInput
                    onChange={(x)=>{
                        setData({
                            ...Data,
                            description: x.target.value
                        })
                    }}
                    label="Description (optional)"></TextInput>
                <br/>
                <hr/>
                <br/>

                <Radio.Group
                    name="favoriteFramework"
                    label="Select your favorite framework/library"
                    description="This is anonymous"
                    withAsterisk
                >
                    <Group mt="xs" display={"initial"}>
                        <br/>
                        <Radio
                            onClick={()=>{
                                setData({
                                    ...Data,
                                    private: false
                                })
                            }}
                            value="ng" label="Public"
                               description="Anyone on the internet can see this repository. You choose who can commit."/>
                        <br/>
                        <Radio onClick={()=>{
                            setData({
                                ...Data,
                                private: true
                            })
                        }} value="vue" label="Private"
                               description="You choose who can see and commit to this repository."/>
                    </Group>
                </Radio.Group>
                <br/>
                <hr/>
                <br/>
                <div>
                    <a>
                        Initialize this repository with:
                    </a>
                    <br/>
                    <br/>
                       <Group wrap="nowrap" align="flex-start">
                           <Radio onClick={()=>{
                               setCreateReadme(!CreateReadme);
                               setData({
                                   ...Data,
                                   add_readme: !CreateReadme
                               })
                           }} checked={CreateReadme} label="add a README file"
                                  description="This is where you can write a long description for your project."/>
                       </Group>
                    {
                        CreateReadme ? (
                            <a>This will set <b>main</b> as the default branch</a>
                        ):null
                    }
                </div>
                <br/>
                <br/>
                <div className="new-btn">
                    <Button onClick={()=>{
                        Commit();
                    }}>Create repository</Button>
                </div>
            </div>
        </>
    )
}

export default RepositoryNew