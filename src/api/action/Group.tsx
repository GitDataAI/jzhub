import {Http} from "@/api/http.tsx";
import {GroupCreate, GroupDesc} from "@/api/dto/GroupDto.tsx";
import {AxiosResponse} from "axios";
import {R} from "@/api/R.tsx";

export class Group extends Http{
    async CreateGroup(dto: GroupCreate):Promise<AxiosResponse<R<string>, never>>{
        return await this.post('/groups/',dto)
    }
    async SearchGroup(key: string, page: number, size: number):Promise<AxiosResponse<R<GroupDesc[]>, never>>{
        return await this.get(`/groups/search?key=${key}&page=${page}&size=${size}`)
    }
}