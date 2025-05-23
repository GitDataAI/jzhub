import React from 'react';
import {CiLink, CiStar} from "react-icons/ci";
import {GoRepo, GoRepoForked} from 'react-icons/go';
import {LuUsers} from "react-icons/lu";
import {useRouter} from "next/navigation";
import {RiUserFollowLine} from "react-icons/ri";
import {Tooltip} from "@mantine/core";


export interface ExploreItemProductProps {
    props:{
        created_at: string,
        default_branch: string,
        description?: string,
        fork: number,
        star: number,
        watch: number,
        name: string,
        rtype: string,
        topic: string[],
        uid: string,
        updated_at: string,
        owner: {
            avatar: string,
            description?: string,
            uid: string,
            name: string,
        }
    }
}


export const ExploreItemProduct = ({props}:ExploreItemProductProps) => {
    const Router = useRouter();
    return(
        <div className="explore-product" onClick={()=>{
            Router.replace(`${props.owner.name}/${props.name}`)
        }}>
            <img className='explore-product-avatar' src={props.owner.avatar ?? '/default.webp'} alt={props.owner.name}/>
            <div className="explore-product-title">
                <div className="explore-product-title-name">
                    <a onClick={() => {
                        Router.replace(`/${props.owner.name}`)
                    }}>{props.owner.name}</a>/{props.name}
                </div>
                <div className="explore-product-title-desc">
                    {props.description}
                </div>
            </div>
            <div className="explore-product-data">
                <div className="explore-product-data-item">
                    <CiStar />{props.star}
                </div>
                <div className="explore-product-data-item">
                    <CiLink />{props.watch}
                </div>
                <div className="explore-product-data-item">
                    <GoRepoForked />{props.fork}
                </div>
            </div>
        </div>
    )
}

export interface ExploreItemUserProps {
    props:{
        created_at: string,
        description?: string,
        name: string,
        uid: string,
        avatar?: string,
        repo: number,
        following: number,
        followed: number,
        updated_at: string,
    }
}

export const ExploreItemUser = ({props}:ExploreItemUserProps) => {
    const Router = useRouter();
    return(
        <div className="explore-users" onClick={() => {
            Router.replace(`/${props.name}`)
        }}>
            <img className='explore-users-avatar' src={props.avatar ?? '/default.webp'} alt={props.name}/>
            <div className="explore-users-title">
                <div className="explore-users-title-name">
                    {props.name}
                </div>
                <div className="explore-users-title-desc">
                    {props.description}
                </div>
            </div>
            <div className="explore-users-data">
                <div className="explore-users-data-item">
                    <Tooltip label={"this is user repository count"}>
                        <GoRepo />
                    </Tooltip>{props.repo}
                </div>
                <div className="explore-users-data-item">
                    <Tooltip label={"this is user following count"}>
                        <LuUsers />
                    </Tooltip>
                    {props.following}
                </div>
                <div className="explore-users-data-item">
                    <Tooltip label={"this is user followed count"}>
                        <RiUserFollowLine />
                    </Tooltip>
                    {props.followed}
                </div>
            </div>
        </div>
    )
}
export interface ExploreItemOrganizationProps {
    props:{
        created_at: string,
        description?: string,
        name: string,
        avatar?: string,
        uid: string,
        updated_at: string,
        repo: number,
        member: number,
    }
}

export const ExploreItemOrganization = ({props}:ExploreItemOrganizationProps) => {
    const Router = useRouter();
    return(
        <div className="explore-organization" onClick={() => {
            Router.replace(`/${props.name}`)
        }}>
            <img className='explore-organization-avatar' src={props.avatar ?? '/default.webp'} alt={props.name}/>
            <div className="explore-organization-title">
                <div className="explore-organization-title-name">
                    {props.name}
                </div>
                <div className="explore-organization-title-desc">
                    {props.description}
                </div>
            </div>
            <div className="explore-organization-data">
                <div className="explore-organization-data-item">
                    <GoRepo />{props.repo}
                </div>
                <div className="explore-organization-data-item">
                    <LuUsers />{props.member}
                </div>
            </div>

        </div>
    )
}