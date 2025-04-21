'use client';

import React from 'react';
import { AppNavbarProps, RepoSettingMenu } from "@/data/Navbar";

export default function RepoSetHeader(props: { owner: string, repo: string, setting: string }) {
    const menu: AppNavbarProps = RepoSettingMenu(props);

    return (
        <div className="repo-set-header">
            <div className="repo-set-header-menu">
                {menu.menu.map((item) => (
                    <div
                        key={item.id}
                        className={`repo-set-header-menu-item ${item.active ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
