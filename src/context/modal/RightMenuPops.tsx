import {useUser} from "@/store/useUser.tsx";

const RightMenuPops = () => {
    const user = useUser();
    const ItemMenu = [
        {
            label: "Profile",
            url: `/${user.model?.username}`
        },
        {
            label: "Setting",
            url: "/setting"
        },
        {
            label: "Logout",
            url: "/logout"
        },
        {
            label: "Help",
            url: "/help"
        },
    ]
    const MenuHandler = (url: string) => {
        console.log(url)
        switch (url){
            case "/logout":
                user.Logout()
                break;
            case "/help":
                break;
            case "/setting":
                break;
            case `/${user.model?.username}`:
                break;
        }
    }
    return(
        <div className="right-menu-pops">
            <div>
                <img className="right-menu-pops-avatar" src={user.user?.profile?.avatar || ""} alt={user.model?.username}/>
                <span className="right-menu-pops-username">
                    <a>{user.model?.username}</a>
                </span>
            </div>
            <br/>
            <div className="line"/>
            <div className="right-menu-pops-menu">
                <ul>
                    {ItemMenu.map((item, index) => (
                        <li key={index} onClick={()=>MenuHandler(item.url)}>
                            <a>{item.label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default RightMenuPops