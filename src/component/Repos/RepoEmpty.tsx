import {GraphQLRepoModel} from "@/api/graphql/repo/Struct.tsx";
import {FaRegMehBlank} from "react-icons/fa";
import { Blankslate } from "@primer/react/experimental";
import {toast} from "@pheralb/toast";

export interface RepoEmptyProps{
    model: GraphQLRepoModel,
    info: {
        owner: string,
        repo: string
    },
}


const RepoEmpty = (props: RepoEmptyProps) => {
    return(
        <div className="repo-empty">
            <Blankslate>
                <Blankslate.Visual>
                    <FaRegMehBlank />
                </Blankslate.Visual>
                <Blankslate.Heading>Not any Files</Blankslate.Heading>
                <Blankslate.Description>
                    Please upload files through the git command line or any other interface
                </Blankslate.Description>
                <Blankslate.PrimaryAction href="#">
                    <a onClick={()=>{
                        const aux = document.createElement("input");
                        aux.setAttribute("value", `https://http.jiaozifs.com/${props.info.owner}/${props.info.repo}`);
                        document.body.appendChild(aux);
                        aux.select();
                        document.execCommand("copy");
                        document.body.removeChild(aux);
                        toast.success({
                            text: "Copied!"
                        })
                    }}>
                        Copy Git Http link
                    </a>
                </Blankslate.PrimaryAction>
                {/*<Blankslate.SecondaryAction href="#">Learn more about wikis</Blankslate.SecondaryAction>*/}
            </Blankslate>
        </div>
    )
}


export default RepoEmpty