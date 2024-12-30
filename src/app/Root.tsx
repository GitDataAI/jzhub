import RootHeader from "../component/root/RootHeader.tsx";
import useUser from "../store/useUser.tsx";
import {useEffect} from "react";

const RootLayout = () => {
    const user = useUser();
    useEffect(()=>{
        user.init();
    },[])
    return(
        <div className="root">
            <RootHeader/>
        </div>
    )
}

export default RootLayout