import {useState} from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {toast} from "@pheralb/toast";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const CodeBlock = ({ language, value }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            toast.success({
                text: "Copied to clipboard"
            });
            setTimeout(() => setCopied(false), 20000);
        });
    };


    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={handleCopy}
                style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    backgroundColor: copied ? 'green' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                }}
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
            <SyntaxHighlighter language={language} style={vscDarkPlus}>
                {value}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock