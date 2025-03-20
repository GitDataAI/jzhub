interface OverviewProps {
    gr: boolean
}

export const Overview = (props: OverviewProps) => {
    console.log(props)
    return (
        <div>
            Overview
        </div>
    )
}