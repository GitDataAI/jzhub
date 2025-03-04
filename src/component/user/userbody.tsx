import {UserDashBored} from "@/server/types";
import {Avatar, Divider} from "@mantine/core";

interface UserBodyProps {
    body: UserDashBored
}

export const UserBody = ({body}: UserBodyProps) => {
    return (
        <div className="user-body">
            <Avatar className="avatar" src={body.user.avatar || ""} variant="white"/>
            <div className="config">
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <h1>{body.user.username}</h1>
                    <h3>{body.user.name}</h3>
                </div>
                <div style={{
                    display: "flex",
                    gap: "2rem"
                }}>
                    <div className="user-body-tabs">
                        <a>Following</a>
                        <span>{body.following.length}</span>
                    </div>
                    <div className="user-body-tabs">
                        <a>Followers</a>
                        <span>{body.followers.length}</span>
                    </div>
                </div>
                <Divider/>
            </div>
            <div className="user-body-list">
                <div className="user-body-indi">
                    {
                        body.user.description && (
                            <div className="user-body-tabs">
                                <a>Description</a>
                                <span>{body.user.description}</span>
                            </div>
                        )
                    }
                    {
                        body.user.website && (
                            <div className="user-body-tabs">
                                <a>Website</a>
                                <span>{body.user.website}</span>
                            </div>
                        )
                    }
                    {
                        body.user.language && (
                            <div className="user-body-tabs">
                                <a>Language</a>
                                <span>{body.user.language}</span>
                            </div>
                        )
                    }
                    {
                        body.user.location && (
                            <div className="user-body-tabs">
                                <a>Location</a>
                                <span>{body.user.location}</span>
                            </div>
                        )
                    }
                    {
                        body.user.timezone && (
                            <div className="user-body-tabs">
                                <a>Timezone</a>
                                <span>{body.user.timezone}</span>
                            </div>
                        )
                    }
                    {
                        body.user.theme && (
                            <div className="user-body-tabs">
                                <a>Theme</a>
                                <span>{body.user.theme}</span>
                            </div>
                        )
                    }
                    {
                        body.user.topic.length > 0 && (
                            <div className="user-body-tabs">
                                <a>Topic</a>
                                {
                                    body.user.topic.map((item, index) => (
                                        <span key={index}>{item}</span>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}