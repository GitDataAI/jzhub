import RootHeader from "../../component/root/RootHeader.tsx";
import {Outlet} from "react-router-dom";

const NewLayout = () => {
    return(
        <>
            <RootHeader/>
            <div className="new">
                <Outlet/>
            </div>
        </>
    )
}

export default NewLayout;