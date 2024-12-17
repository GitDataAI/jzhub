import { useTranslation } from "react-i18next";

interface EcosystemItem {
  name: string;
  author: string;
  description: string;
  logo: string;
  downloadCount: number;
}

function EcosystemData(): EcosystemItem[] {
  const { t } = useTranslation("ExtensionData");
  return [
    {
      name: t("DuckDB"),
      author: t("DuckDBAuthor"),
      description: t("DuckDBDes"),
      logo: "images/home/ecosystem/duckdb-logo.png",
      downloadCount: 11.1,
    },
    {
      name: t("ReactToolkit"),
      author: t("ReactToolkitAuthor"),
      description: t("ReactToolkitDes"),
      logo: "images/home/ecosystem/react-logo.png",
      downloadCount: 22.5,
    },
    {
      name: t("AICodeAssistant"),
      author: t("AICodeAssistantAuthor"),
      description: t("AICodeAssistantDes"),
      logo: "images/home/ecosystem/ai-assistant-logo.png",
      downloadCount: 18.4,
    },
    {
      name: t("GraphQLExplorer"),
      author: t("GraphQLExplorerAuthor"),
      description: t("GraphQLExplorerDes"),
      logo: "images/home/ecosystem/graphql-logo.png",
      downloadCount: 9.8,
    },
    {
      name: t("CloudSync"),
      author: t("CloudSyncAuthor"),
      description: t("CloudSyncDes"),
      logo: "images/home/ecosystem/cloud-sync-logo.png",
      downloadCount: 13.6,
    },
    {
      name: t("DarkModeThemes"),
      author: t("DarkModeThemesAuthor"),
      description: t("DarkModeThemesDes"),
      logo: "images/home/ecosystem/dark-themes-logo.png",
      downloadCount: 7.4,
    },
    {
      name: t("KotlinDevTools"),
      author: t("KotlinDevToolsAuthor"),
      description: t("KotlinDevToolsDes"),
      logo: "images/home/ecosystem/kotlin-logo.png",
      downloadCount: 14.1,
    },
    {
      name: t("SecurityScanner"),
      author: t("SecurityScannerAuthor"),
      description: t("SecurityScannerDes"),
      logo: "images/home/ecosystem/security-logo.png",
      downloadCount: 10.9,
    },
  ];
}

export default EcosystemData;
