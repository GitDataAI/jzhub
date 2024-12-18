
const RepositoryCard = () => {
    return (
        <div className="repository-card">
            <h2 className="repo-name">GitDataAi</h2>
            <span className="visibility">Public</span>
            <p className="forked-from">Forked from <a href="https://github.com/GitDataAi/jzfs">GitDataAi/jzfs</a></p>
            <p className="description">A Git-like Version Control File System for AI & Data Product Management.</p>
            <div className="stats">
                <span className="language">Rust</span>
                <span className="other">Other</span>
            </div>
            <p className="last-updated">Updated 2 weeks ago</p>
        </div>
    );
};

export default RepositoryCard;