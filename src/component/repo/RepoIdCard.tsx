import {RelativeTime} from '@primer/react'
import {useNavigate} from "react-router-dom";
import {RepoModel} from "../../lib/model/RepoModel.tsx";
const RepositoryCard = ({repo}: {repo: RepoModel}) => {
    const lastUpdated = new Date(repo.updated * 1000);
    const nav = useNavigate();
    return (
        <div className="repository-card" onClick={()=>{
            nav(`/${repo.owner}/${repo.name}`)
        }}>
            <h2 className="repo-name">{repo.name}</h2>
            <span className="visibility">{repo.private ? 'Public' : 'Private'}</span>
            {
                repo.fork ? (
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
                <p className="forks">Forks: {repo.nums_fork}</p>
                <p className="stars">Stars: {repo.nums_star}</p>
                <p className="stars">Watchers: {repo.nums_watcher}</p>
                <p className="stars">Commits: {repo.nums_commit}</p>
                <p className="stars">Tag: {repo.nums_tag}</p>
                <p className="stars">Release: {repo.nums_release}</p>
            </div>
        </div>
    );
};

export default RepositoryCard;