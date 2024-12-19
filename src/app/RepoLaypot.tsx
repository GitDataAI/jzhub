import {useParams} from "react-router-dom";
import {LayoutHeader} from "@/component/layout/Header.tsx";

const RepoLayout = () => {
    const { owner, repo } = useParams();
    console.log(owner, repo)
    return(
        <>
            <LayoutHeader/>
        </>
    )
}

export default RepoLayout