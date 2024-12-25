import {LayoutHeader} from "@/component/layout/Header.tsx";
import {useRef, useState} from "react";
import {RepoCreate} from "@/api/dto/RepoDto.tsx";
import {toast} from "@pheralb/toast";
import {useUser} from "@/store/useUser.tsx";
import {UserAPi} from "@/api/action/User.tsx";
import {useNavigate} from "react-router-dom";

const RepoNew = () => {
    const user = useUser();
    const user_api = new UserAPi();
    const [ createOption, setCreateOption ] = useState<RepoCreate>({
        owner: user.model?.uid || '',
        is_group: false,
        name: '',
        description: '',
        licenseName: undefined,
        license: undefined,
        topic: undefined,
        visible: true,
        default_branch: 'main'
    });
    const selectOwnRef = useRef(null);
    const selectLicenseRef = useRef(null);
    const nav = useNavigate();
    const Commit = () => {
        // @ts-nocheck
        let option = createOption;
        if (selectLicenseRef.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            option.license = selectLicenseRef.current.value;
        }
        if (selectOwnRef.current){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            option.owner = selectOwnRef.current.value;
        }else{
            toast.error({
                text: "Owner is required",
            });
        }
        if (option.name === ''){
            toast.error({
                text: "Name is required",
            });
        }
        if (option.owner === user.model?.uid){
            user_api.CreateRepo(option).then(res=>{
                if (res.status === 200 && res.data.code === 200){
                    toast.success({
                        text: "Create success",
                        description: "You can see your repository in your profile"
                    })
                    user.initial().then().catch();
                    nav(`/${user.model!.username}/${createOption.name}`)
                }else{
                    toast.error({
                        text: "Create failed",
                        description: "Please check your input"
                    })
                }
            })
        }
        
        // TODO
    }
    return(
        <div className="reponew">
            <LayoutHeader/>
            <div className="create-repo-form">
                <h2>Create a new repository</h2>
                <p>A repository contains all project files, including the revision history.</p>
                <form>
                    <div className="form-group">
                        <label htmlFor="owner">Owner *</label>
                        <select id="owner" name="owner" required ref={selectOwnRef}>
                            <option value={user.model?.uid}>{user.model?.username}</option>
                            {/* TODO */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="repo-name">Repository name *</label>
                        <input type="text" id="repo-name" name="repo-name" required onChange={(x)=>{
                            setCreateOption({
                                ...createOption,
                                name: x.target.value
                            });
                        }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description (optional)</label>
                        <textarea id="description" name="description" onChange={(x)=>{
                            setCreateOption({
                                ...createOption,
                                description: x.target.value
                            });
                        }}></textarea>
                    </div>
                    <div className="form-group">
                        <input type="radio" id="public" name="visibility" defaultChecked onClick={(x)=>{
                            setCreateOption({
                                ...createOption,
                                visible: true
                            })
                            x.stopPropagation();
                        }}/>
                        <label htmlFor="public">Public</label>
                        <p>Anyone on the internet can see this repository. You choose who can commit.</p>
                    </div>
                    <div className="form-group">
                        <input type="radio" id="private" name="visibility" onClick={(x)=>{
                            setCreateOption({
                                ...createOption,
                                visible: false
                            })
                            x.stopPropagation();
                        }}/>
                        <label htmlFor="private">Private</label>
                        <p>You choose who can see and commit to this repository.</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="license">Choose a license</label>
                        <select id="license" name="license" ref={selectLicenseRef}>
                            <option value="none">None</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="public-repo">You are creating a public repository in your personal account.</label>
                    </div>
                    <button className="new-button" type="button" onClick={Commit}>Create repository</button>
                </form>
            </div>
        </div>
    )
}


export default RepoNew