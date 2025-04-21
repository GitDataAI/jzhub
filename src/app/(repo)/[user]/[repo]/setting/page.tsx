import React from 'react';
import RepoSetHeader from '@/component/repo/RepoSetHeader';


export default function Repo(props: { owner: string, repo: string, setting: string }) {
    return (
        <div className="repo">
            <RepoSetHeader owner={props.owner} repo={props.repo} setting={props.setting} />
            <div>
                <p>这里是 repo 的其他内容</p>
            </div>
        </div>
    );
}
