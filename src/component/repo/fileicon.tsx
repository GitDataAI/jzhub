import {PiFileCppLight, PiFileJsxDuotone, PiFileTsx, PiMarkdownLogo} from "react-icons/pi";
import {FaFile, FaJava, FaNodeJs, FaRust} from "react-icons/fa";
import {IoDocumentText} from "react-icons/io5";
import {CssIcon} from "@mantinex/dev-icons";
import {IconJson} from "@tabler/icons-react";
import {SiTypescript} from "react-icons/si";
import {AiOutlinePython} from "react-icons/ai";
import { FaGolang } from "react-icons/fa6";
import {DiRuby} from "react-icons/di";

interface FileiconProps {
    name: string
}

export const Fileicon = (props: FileiconProps) => {
    const extend = props.name.split(".").pop() || "";
    switch (extend) {
        case "md":
            return <PiMarkdownLogo />;
        case "css":
            return <CssIcon />;
        case "js":
            return <FaNodeJs />;
        case "json":
            return <IconJson />;
        case "ts":
            return <SiTypescript />;
        case "jsx":
            return <PiFileJsxDuotone />;
        case "tsx":
            return <PiFileTsx />;
        case "java":
            return <FaJava />;
        case "txt":
            return <IoDocumentText />;
        case "cpp":
            return <PiFileCppLight />;
        case "rs":
            return <FaRust />;
        case "py":
            return <AiOutlinePython />;
        case "go":
            return <FaGolang />;
        case "ruby'":
            return <DiRuby />;
        default:
            return <FaFile />;
    }
}