// import {useInfo} from "@/store/useInfo.tsx";
// import {useState} from "react";
// import RightMenuPops from "@/context/modal/RightMenuPops.tsx";

export interface ModelProps{
    children: JSX.Element;
}

export const Modal = (props: ModelProps) => {
    // const [showId,setShowId] = useState(useInfo().ModelShowId);
    // useInfo.subscribe((x)=>{
    //     console.log(x.ModelShowId)
    //     setShowId(x.ModelShowId)
    // })
    return(
        <div className="model">
            {props.children}
            {/*{ showId === 1 && <HeaderCreate/> }*/}
            {/*{ showId === 2 && <ChangeWorkSpace/> }*/}
        </div>
    )
}