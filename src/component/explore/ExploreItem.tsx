import React from 'react';
import {CiLink, CiStar} from "react-icons/ci";
import {GoRepo, GoRepoForked} from 'react-icons/go';
import {LuUsers} from "react-icons/lu";


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
    return(
        <div className="explore-product">
            <img className='explore-product-avatar' src={props.owner.avatar ?? '/default.webp'} alt={props.owner.name}/>
            <div className="explore-product-title">
                <div className="explore-product-title-name">
                    {props.name}
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
        updated_at: string,
    }
}

export const ExploreItemUser = ({props}:ExploreItemUserProps) => {
    return(
        <div className="explore-users">
            <img className='explore-users-avatar' src={props.avatar ?? '/default.webp'} alt={props.name}/>
            <div className="explore-users-title">
                <div className="explore-users-title-name">
                    {props.name}
                </div>
                <div className="explore-users-title-desc">
                    {props.description}
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
    return(
        <div className="explore-organization">
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