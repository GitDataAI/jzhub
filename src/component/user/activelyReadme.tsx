import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface ActivelyReadmeProps {
    readme?: Uint8Array | undefined
}

export const ActivelyReadme = ({readme}: ActivelyReadmeProps) => {
    if (readme) {
        const markdown = readme.toString();
        return (
            <div className="markdown-body">
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        code: ({node, inline, className, children, ...props}) => {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <div className="code-block">
                                    <code className={className}>{children}</code>
                                </div>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                >{markdown}</ReactMarkdown>
            </div>
        )
    }else {
        return (
            <div className="markdown-body">
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                >{`# No README.md`}</ReactMarkdown>
            </div>
        )
    }
}