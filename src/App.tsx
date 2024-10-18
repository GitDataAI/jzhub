import React, { useState, useEffect } from 'react';
import "./home.scss";

const useLoginNavigation = () => {

    const LoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Login click");
    };

    return LoginClick;
};

const Header = () => {
    const LoginClick = useLoginNavigation();
    return (
        <div className="headerBox">
            <div className="log">
                <img src="../public/jiaozifs2.png" alt="Logo" />
                <span>DataHub</span>
            </div>
            <nav className="nav">
                <a href="#">Databases</a>
                <a href="#">Documentation</a>
                <a href="#">Pricing</a>
            </nav>
            <button className="Login" onClick={LoginClick}>Login register</button>
        </div>
    );
};

const Intro = () => {
    const LoginClick = useLoginNavigation();
    return (
        <div className="Welcome">
            <section className="intro">
                <h1>Welcome To dataHub</h1>
                <p>
                    We provide professional data services and solutions to<br />
                    help you better manage and analyze your data.
                </p>
                <button type="button" onClick={LoginClick}>Get Started with Dolt</button>
            </section>
        </div>
    );
};

const Products = () => {
    const productList = [
        {
            title: "Cloud Storage",
            description: "Reliable and scalable cloud storage for all your data.",
            image: "../public/Homeimage/1-21030Q11Z4P0.jpg"
        },
        {
            title: "Data Analysis Tools",
            description: "Advanced tools to help you analyze data and gain insights.",
            image: "https://e-assets.gitee.com/gitee-community-web/_next/static/media/insight.ed906481.png"
        },
        {
            title: "Security Solutions",
            description: "Protect your data with industry-leading security measures.",
            image: "https://e-assets.gitee.com/gitee-community-web/_next/static/media/logo07.380c6a5b.jpg!/quality/100"
        }
    ];
    return (
        <div className="products">
            <section className="text">
                <h1>Products and Services</h1>
                <p>Give your data a home</p>
            </section>
            <div className="product-list">
                {productList.map((product, index) => (
                    <div className="product-item" key={index}>
                        <img src={product.image} alt={product.title} />
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const WorkflowComponent = () => {
    const [activeStep, setActiveStep] = useState(0);

    const images = [
        "https://www.dolthub.com/images/databases.webp",
        "https://www.dolthub.com/images/workspaces.webp",
        "https://www.dolthub.com/images/diff.webp",
        "https://www.dolthub.com/images/merge.png",
    ];

    const steps = [
        "Create branches from your main database",
        "Make changes or experiment with data",
        "Analyze your changes in a diff",
        "Merge your changes back to main"
    ];

    const handleStepClick = (index:number) => {
        setActiveStep(index);
    };

    return (
        <div className="workflowBox">
            <section className="header-section">
                <p className="subtitle">FAMILIAR WORKFLOWS</p>
                <h1 className="main-title">You already know how to use it</h1>
                <p className="description">Dolt matches Git and MySQL interfaces.</p>
            </section>

            <div className="workflow-content">
                <div className="commit-graph">
                    <img src={images[activeStep]} alt={`Step ${activeStep + 1}`} />
                </div>
            </div>

            <section className="steps-section">
                {steps.map((step, index) => (
                    <div 
                        key={index}
                        className={`step ${activeStep === index ? 'active' : ''}`} 
                        onClick={() => handleStepClick(index)}
                    >
                        <img src={images[index]} alt={`Step ${index + 1}`} />
                        <p>{step}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const testimonials = [
        {
            quote: "dataHub Store our machine learning data to provide us with the repeatability and interpretability of the model.",
            author: "flock safety"
        },
        {
            quote: "Data processing is easier than ever before, making our project management more efficient.",
            author: "project manager"
        },
        {
            quote: "Integrating multiple functions, dataHub has become an important tool in our daily work.",
            author: "data scientist"
        }
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000); 

        return () => {
            clearInterval(interval);
        };
    }, [])
    return (
        <div className="carousel">
            <div className="carousel-content">
                <p className="quote">“{testimonials[currentIndex].quote}”</p>
                <p className="author">— {testimonials[currentIndex].author}</p>
            </div>
            <div className="carousel-dots">
                {testimonials.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

const TestimonialCard = () => {
    return (
        <div className='testimonial'>
            <div className="card">                                       
                <div className="testimonial-header">
                    <div className='log'>
                        <img src="../public/jiaozifs2.png" alt="Logo" />
                        <span>DataHub</span>
                    </div>
                    <a className='gitHub' href='https://github.com/GitDataAI/jiaozihub'>
                        <svg height="32" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="32" data-view-component="true" className="octicon octicon-mark-github">
                        <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path></svg>
                        <span>DataHub is open source</span>
                    </a>
                </div>
                <div className="testimonial-content">
                    <p className="quote">
                        “We rely on computer vision and ML to fulfill Gather AI's mission.
                        daaHub enables our ML team to be productive, collaborate efficiently,
                        and iterate quickly.”
                    </p>
                </div>

                <div className="stats">
                    <div className="stat">
                        <h2>40%</h2>
                        <p>Reduce storage size and transfer time</p>
                    </div>
                    <div className="stat">
                        <h2>4</h2>
                        <p>Eliminates data silos by switching to XetHub</p>
                    </div>
                    <div className="stat">
                        <h2>51%</h2>
                        <p>Cost savings compared to using EBS, Git LFS, and DVC</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

const MLSection = () => {
    const [isGitLFSOpen, setGitLFSOpen] = useState(false);
    const [isDVCOpen, setDVCOpen] = useState(false);

    const toggleGitLFS = () => {
        setGitLFSOpen(!isGitLFSOpen);
    };

    const toggleDVC = () => {
        setDVCOpen(!isDVCOpen);
    };

    return (
        <div className="ml-section">
            <div className="title">
                <h1>ML development shouldn't be fractured</h1>
            </div>
            <div className="ml-content">
                <div className="ml-text">
                    <h2>ML development shouldn't be fractured</h2>
                    <p>
                        Let XetHub bridge the contextual gap between your tools so you can focus
                        on development.
                    </p>
                    <ul>
                        <li>• Write or sync outputs to XetHub</li>
                        <li>• Version across tools and formats</li>
                        <li>• Time travel to any point in history</li>
                        <li>• CI/CD your full ML stack</li>
                    </ul>
                </div>
                <div className="ml-image">
                    <img src="https://framerusercontent.com/images/YBxAJDAvNvMIjMpVgegrOTRRc.png" />
                </div>
            </div>
            <div className="ml-content">
                <div className="ml-text">
                    <h2>Your one-stop shop for ML collaboration.</h2>
                    <p>
                        Keep everyone on the same page as projects evolve, with easy file and
                        project level sharing.
                    </p>
                    <ul>
                        <li>• Branch for safe experimentation</li>
                        <li>• Add custom views for context</li>
                        <li>• Review changes in one place</li>
                        <li>• Granular access controls</li>
                    </ul>
                </div>
                <div className="ml-image">
                    <img src="https://framerusercontent.com/images/YBxAJDAvNvMIjMpVgegrOTRRc.png" alt="ML Collaboration" />
                </div>
            </div>
            <div className="ml-content">
                <div className="ml-text">
                    <h2>Built-in performance and efficiency</h2>
                    <p>
                        Optimized terabyte-scale storage that seamlessly scales to
                        fit your team’s needs.
                    </p>
                    <ul>
                        <li>• Stream files without downloading</li>
                        <li>• Mount repositories for fast exploration</li>
                        <li>• Leverage zero-cost clones and branches</li>
                        <li>• Deploy caches to speed transfers</li>
                    </ul>
                </div>
                <div className="ml-image">
                    <img src="https://framerusercontent.com/images/YBxAJDAvNvMIjMpVgegrOTRRc.png" />
                </div>
            </div>
            <div className="ml-content">
                <div className="ml-text">
                    <h2>Upgrade your legacy versioning tools</h2>
                    <p>
                        Stop working around software-era size limitations with seamless versioning
                        at scale. No extra commands or servers needed.
                    </p>
                    <ul>
                        <li onClick={toggleGitLFS}>
                            <span>{isGitLFSOpen ? "^" : ">"}</span>
                            <span>Git LFS</span>
                        </li>
                        <div className={`collapsible-body ${isGitLFSOpen ? "open" : ""}`}>
                            <p>
                                The OG of large file versioning, Git LFS requires server
                                management and runs into major performance issues at when
                                repositories grow in size. Every large file needs to be
                                explicitly added and referenced on each commit, impacting overall
                                usability.
                            </p>
                        </div>
                    </ul>

                    <ul>
                        <li onClick={toggleDVC}>
                            <span>{isDVCOpen ? "^" : ">"}</span>
                            <span>DVC</span>
                        </li>
                        <div className={`collapsible-body ${isDVCOpen ? "open" : ""}`}>
                            <p>
                                DVC is another tool that helps manage large datasets. However, it
                                does not handle deduplication as effectively as XetHub.
                            </p>
                        </div>
                    </ul>
                </div>
                <div className="ml-image">
                    <img src="https://framerusercontent.com/images/YBxAJDAvNvMIjMpVgegrOTRRc.png" />
                </div>
            </div>
        </div>
    );
};

const DevOpsPlatform = () => {
    return (
        <div className="devops-platform">
            <h1 className="platform-title">Enterprise-level DevOps R&D <br />performance platform</h1>
            <div className="platform-content">
                <div className="text-content">
                    <h1>Project collaboration</h1>
                    <p>
                        Provide a variety of project templates such as agility, waterfall, task collaboration, etc.
                        To reduce the difficulty of getting started.
                        Project progress can be managed through Gantt chart, Kanban, Scrum, etc.
                        and the overall control and risk control are clear at a glance.
                    </p>
                    <a href="#" className="learn-more">Learn more</a>
                </div>
                <div className="image-content">
                    <img src="https://framerusercontent.com/images/fHQpl5ay38wDXILzrl7EhQka0.png?scale-down-to=2048" />
                </div>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <a href="#">Pricing</a>
                    <a href="#">Documentation</a>
                    <a href="#">Blog</a>
                    <a href="#">Team</a>
                    <a href="#">Security</a>
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                </div>
                <div className="footer-social">
                    <a href="https://github.com">
                        <img src="../public/Homeimage/github.svg" alt="GitHub" />
                    </a>
                    <a href="https://discord.com">
                        <img src="../public/Homeimage/discord.svg" alt="Discord" />
                    </a>
                    <a href="https://linkedin.com">
                        <img src="../public/Homeimage/linkedin.svg" alt="LinkedIn" />
                    </a>
                    <a href="https://twitter.com">
                        <img src="../public/Homeimage/Twitter.svg" alt="Twitter" />
                    </a>
                    <a href="https://youtube.com">
                        <img src="../public/Homeimage/Youtube-fill.svg" alt="YouTube" />
                    </a>
                </div>
            </div>
            <div className="footer-copyright">
                © 2024 DoltHub, Inc. All rights reserved.
            </div>
        </footer>
    );
};

const App = () => {
    return (
        <div className="HomePage">
            <Header />
            <Intro />
            <DevOpsPlatform />
            <Products />
            <WorkflowComponent />
            <Carousel />
            <MLSection />
            <TestimonialCard />
            <Footer />
        </div>
    );
};

export default App;


