import {useInfo} from "../../store/useInfo.tsx";
import {useEffect} from "react";

const HomeLayout = () => {
    const info = useInfo();
    useEffect(() => {
        info.setLocal("Home", "/home")
    }, []);
    return(
        <>
        </>
    )
}

export default HomeLayout