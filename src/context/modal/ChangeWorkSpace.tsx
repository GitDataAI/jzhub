export const ChangeWorkSpace = () => {
    const item = [
        {
            label: "工作空间1",
            uid: "/",
            icon: "/gitdata.ai-redpanda.png"
        },
        {
            label: "工作空间2",
            uid: "/",
            icon: "/gitdata.ai-redpanda.png"
        },
        {
            label: "工作空间3",
            uid: "/",
            icon: "/gitdata.ai-redpanda.png"
        },
    ]
    return(
        <div className="change-workspace">
            <h1>修改工作空间</h1>
            <ul>
                {
                    item.map((item, index) => {
                        return(
                            <li key={index}>
                                <img src={ item.icon } alt={ item.label }/>
                                <span>
                                    {item.label}
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="change-workspace-btn">
                <button>
                    空间管理
                </button>
                <button>
                    创建组织
                </button>
            </div>
        </div>
    )
}