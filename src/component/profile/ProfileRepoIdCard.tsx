import {RelativeTime} from '@primer/react'
import {useNavigate} from "react-router-dom";
import {GraphQLUserRepo} from "@/api/graphql/user/Struct.tsx";
const RepositoryCard = ({repo}: {repo: GraphQLUserRepo}) => {
    const lastUpdated = new Date(repo.updated_at);
    console.log(lastUpdated);
    const nav = useNavigate();
    return (
        <div className="repository-card" onClick={()=>{
            nav(`/${repo.owner}/${repo.name}`)
        }}>
            <h2 className="repo-name">{repo.name}</h2>
            <span className="visibility">{repo.visible ? 'Public' : 'Private'}</span>
            {
                repo.is_fork ? (
                    <p className="forked-from">Forked from <a href={repo.fork_from!}>{repo.fork_from}</a></p>
                ) : null
            }
            <p className="description">{repo.description}</p>
            <div className="stats">
                {
                    repo.topic.map((topic, index) => {
                        return <span key={index} className="other">{topic}</span>
                    })
                }
            </div>
            <p className="last-updated">Updated <RelativeTime date={lastUpdated} noTitle={true}/></p>
            <div className="repo-data">
                <p className="forks">Forks: {repo.fork}</p>
                <p className="stars">Stars: {repo.star}</p>
                <p className="watchers">Watchers: {repo.watch}</p>
                <p className="issues">Issues: {repo.issue}</p>
                <p className="pr">Pr: {repo.pr}</p>
                <p className="size">Size: {repo.size}</p>
            </div>
        </div>
    );
};

export default RepositoryCard;