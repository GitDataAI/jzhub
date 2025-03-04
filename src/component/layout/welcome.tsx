import {Button, Input} from "@mantine/core";

export default function LayoutWelCome() {
    return (
        <div className="welcome">
            <section className="home-title">
                <h1>Git Based Data Products Hub</h1>
                <span>How people build, manage and share Data Products.</span>
            </section>
            <section className="home-start">
                <div className="start-up">
                    <Input placeholder="Enter your Email"/>
                    <Button color="orange">
                        Sign up for GitDataAI
                    </Button>
                </div>
                <div className="start-in">
                    <Button color="orange">
                        Sign in
                    </Button>
                </div>
            </section>
            <section className="home-intro">

            </section>
        </div>
    )
}