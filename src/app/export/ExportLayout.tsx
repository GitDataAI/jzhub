import {useInfo} from "../../store/useInfo.tsx";
import {useEffect} from "react";

const ExportLayout = () => {
    const info = useInfo();
    useEffect(() => {
        info.setLocal("Export", "/export")
    }, []);
    return(
        <>
        </>
    )
}

export default ExportLayout