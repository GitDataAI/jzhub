import {useInfo} from "@/store/useInfo.tsx";
import {MdOutlineDashboard, MdOutlineExplore, MdOutlineHistory, MdOutlineStarBorder} from "react-icons/md";

export const LayoutSidebar = () => {
    const info = useInfo();

    return(
        <div className="layout-sidebar">
            <div className="layout-sidebar-handsome">
                <img src="/gitdata.ai-redpanda.png" alt=""/>
                <button onClick={(e)=>{
                    info.setModelShowId(2);
                    e.stopPropagation();
                }}>个人空间</button>
            </div>
            <div className="layout-sidebar-export">
                <ul>
                    <li className="active">
                        <span>
                            <MdOutlineExplore />
                            探索
                        </span>
                    </li>
                    <li>
                        <span>
                            <MdOutlineDashboard />
                            概览
                        </span>
                    </li>
                    <li>
                        <span>
                            <MdOutlineStarBorder />
                            收藏
                        </span>
                    </li>
                    <li>
                        <span>
                            <MdOutlineHistory />
                            最近
                        </span>
                    </li>
                </ul>
            </div>

        </div>
    )
}