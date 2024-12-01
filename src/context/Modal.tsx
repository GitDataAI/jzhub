import {useInfo} from "@/store/useInfo.tsx";
import {useState} from "react";
import {HeaderCreate} from "@/context/modal/HeaderCreate.tsx";
import {ChangeWorkSpace} from "@/context/modal/ChangeWorkSpace.tsx";

export interface ModelProps{
    children: JSX.Element;
}

export const Modal = (props: ModelProps) => {
    const [showId,setShowId] = useState(useInfo().ModelShowId);
    useInfo.subscribe((x)=>{
        setShowId(x.ModelShowId)
    })
    return(
        <div className="model">
            {props.children}
            { showId === 1 && <HeaderCreate/> }
            { showId === 2 && <ChangeWorkSpace/> }
        </div>
    )
}