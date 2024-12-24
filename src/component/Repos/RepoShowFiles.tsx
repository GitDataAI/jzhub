export interface RepoShowFilesProps{
    file: {
        path: string,
        name: string,
        hash: string
    },
    data: Uint8Array
}


const RepoShowFiles = (props: RepoShowFilesProps) => {
    console.log(props)
    return (
        <div>

        </div>
    )
}

export default RepoShowFiles