import {useInfo} from "../../store/useInfo.tsx";
import {useEffect} from "react";

const HistoryLayout = () => {
    const info = useInfo();
    useEffect(() => {
        info.setLocal("History", "/history")
    }, []);
    return(
        <>
        </>
    )
}

export default HistoryLayout