import {GoOrganization, GoProject, GoRepo, GoRepoPush} from "react-icons/go";


export const HeaderCreate = () => {
    return(
        <>
            <div onClick={(e) => {
               e.preventDefault();
            }} className="layout-header-right-create-card">
                <ul>
                    <li >
                        <GoRepo/>
                        <span>New Repository</span>
                    </li>
                    <li>
                        <GoRepoPush/>
                        <span>Import Repository</span>
                    </li>
                    <li className="li-line"/>
                    <li>
                        <GoProject/>
                        <span>New Project</span>
                    </li>
                    <li className="li-line"/>
                    <li>
                        <GoOrganization/>
                        <span>New Organization</span>
                    </li>

                </ul>
            </div>
        </>
    )
}