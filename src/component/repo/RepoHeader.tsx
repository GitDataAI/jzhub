import {RepoModel} from "../../lib/model/RepoModel.tsx";
import {Breadcrumbs, Button, Label, PageHeader, UnderlineNav} from "@primer/react";
import {useState} from "react";
import { LuFiles } from "react-icons/lu";
import {VscIssues} from "react-icons/vsc";
import {IoIosGitPullRequest} from "react-icons/io";
import {SiWikibooks} from "react-icons/si";
import {CiSettings, CiStar} from "react-icons/ci";
import {GoEye, GoRepoForked} from "react-icons/go";

const RepoHeader = (props: RepoModel)=>{
    const [Tab, setTab] = useState<string>("files");
    return(
        <div className="repo-header">
            <PageHeader>
                <PageHeader.TitleArea>
                    <PageHeader.Title>
                        <Breadcrumbs>
                            <Breadcrumbs.Item href={`/${props.owner}`}>{props.owner}</Breadcrumbs.Item>
                            <Breadcrumbs.Item href={`/${props.owner}/${props.name}`}>{props.name}</Breadcrumbs.Item>
                        </Breadcrumbs>
                    </PageHeader.Title>
                    <PageHeader.TrailingVisual>
                        <Label>Beta</Label>
                    </PageHeader.TrailingVisual>
                </PageHeader.TitleArea>
                <PageHeader.Navigation>
                    <UnderlineNav aria-label="Pull Request">
                        <UnderlineNav.Item aria-current={Tab ==="files" ? "page" : undefined} onClick={()=>{setTab("files")}} icon={LuFiles}>
                            Files
                        </UnderlineNav.Item>
                        <UnderlineNav.Item aria-current={Tab ==="issues" ? "page" : undefined} onClick={()=>{setTab("issues")}} icon={VscIssues} >
                            Issues
                        </UnderlineNav.Item>
                        <UnderlineNav.Item aria-current={Tab ==="pr" ? "page" : undefined} onClick={()=>{setTab("pr")}} icon={IoIosGitPullRequest}>
                            Pull Request
                        </UnderlineNav.Item>
                        <UnderlineNav.Item aria-current={Tab ==="wiki" ? "page" : undefined} onClick={()=>{setTab("wiki")}} icon={SiWikibooks} >
                            Wiki
                        </UnderlineNav.Item>
                        <UnderlineNav.Item aria-current={Tab ==="setting" ? "page" : undefined} onClick={()=>{setTab("setting")}} icon={CiSettings}>
                            Setting
                        </UnderlineNav.Item>
                    </UnderlineNav>
                </PageHeader.Navigation>
                <PageHeader.Actions>
                    <Button count={props.nums_watcher} className="repo-header-btn" variant="default"><GoEye/><a>Watch</a></Button>
                    <Button count={props.nums_fork} className="repo-header-btn" variant="default"><GoRepoForked/><a>Fork</a></Button>
                    <Button count={props.nums_star} className="repo-header-btn" variant="default"><CiStar/><a>Starred</a></Button>
                </PageHeader.Actions>
            </PageHeader>
        </div>
    )
}

export default RepoHeader