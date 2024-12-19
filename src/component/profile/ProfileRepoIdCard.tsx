import {RepoModel} from "@/api/dto/RepoDto.tsx";
import {RelativeTime} from '@primer/react'
import {useNavigate} from "react-router-dom";
const RepositoryCard = ({repo}: {repo: RepoModel}) => {
    const [year, dayOfYear, offsetSeconds, hour, minute, nanosecond] = repo.updated_at;
    const lastUpdated = new Date(Date.UTC(year, 0, dayOfYear, hour, minute, nanosecond / 1000000));
    console.log(offsetSeconds);
    const nav = useNavigate();
    return (
        <div className="repository-card" onClick={()=>{
            nav(`/${repo.owner}/${repo.name}`)
        }}>
            <h2 className="repo-name">{repo.name}</h2>
            <span className="visibility">{repo.visible ? 'Public' : 'Private'}</span>
            {
                repo.is_fork ? (
                    <p className="forked-from">Forked from <a href={repo.fork_from}>{repo.fork_from}</a></p>
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