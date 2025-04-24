

# JZHub

JZHub is an open-source data hub designed to empower researchers, data scientists, and open science enthusiasts to manage, version, and publish scientific data with ease. Built on JZFS (a Git-like version control file system) and integrated with Resource Hub of models, workflows,storage and computation, JZHub provides a flexible platform for collaborative data workflows. Whether you're creating citable data papers, sharing datasets, or tracking experimental changes, JZHub streamlines the process with modern tools and automation.

----
## Features

JZHub offers a range of capabilities to meet the needs of researchers and data scientists, inspired by public data hubs like Dataset Hubs, LLM hubs, and AI hubs. Here’s what JZHub provides:
- Data Versioning and Collaboration: Track changes to datasets, models, and documents using JZFS, enabling Git-like versioning for collaborative research workflows, supporting team-based data management. This mirrors data hubs’ focus on versioning and collaboration, as seen in platforms like GitHub. 


- Hosting and Publishing: Store and share data and models in a hub, ensuring persistent, accessible, and citable outputs for open science, with cross-domain interoperability. 


- Metadata Management and Discovery: Automatically generate and manage metadata for datasets and models, with search and discovery features to enhance data reuse and accessibility.


- LLM Integration: Leverage large language models (e.g., Deepseek) for automated content generation (e.g., data papers, blogs, documentation) and retrieval-augmented generation (RAG) for querying data.


- Model Hosting and Fine-Tuning: Host and fine-tune LLMs or AI models, with integration for on-device deployment via Cloud or decentralized storage, supporting scalable AI research。 


- Security, Compliance, and Governance: Offer access controls, compliance monitoring, and data protection features for sensitive research data, ensuring trust in multi-institutional collaborations.


----
## Use Cases
JZHub’s use cases are designed to support researchers in open science and AI-driven research.Here’s how JZHub can be used:
- Data Paper Creation and Publication: Generate citable data papers from datasets using LLMs, publish with datasets as IPLD products or other formats for open science and reproducibility. 


- Collaborative Research Workflows: Track experiment data or model versions across distributed teams, share securely via decentralized storage, enhancing multi-institutional research. 


- AI-Driven Insights and Reporting: Use RAG to query datasets/models for insights, with LLM-generated summaries for reports, supporting data-driven decision-making in research. 


- Decentralized Model Deployment: Host fine-tuned LLMs or AI models for on-device use in research applications, enabling innovation in resource-constrained environments. 


- Compliance and Governance for Sensitive Data: Manage sensitive data with access controls and compliance monitoring, ensuring ethical use in collaborative open science projects.

## Enterprise Data Hub

Enterprise data continues to grow exponentially, intensifying pressure on organizations to harness this valuable resource.   However, organizations find themselves unprepared to capture value from all this data, mainly because of disparate data sources and a lack of proper data sharing protocols.   Valuable enterprise data is often trapped in silos because of poor data sharing culture and inadequate infrastructure.   Current tooling for sharing data doesn’t cater to data consumers’ varying skill levels, hindering time to value from data.   Chief data officers and IT leaders must address this issue by shifting the mindset from creating ad hoc data projects to managing data as a product.

JZHub, aka. JiaoZi Data Product Hub, enables Git protocol based data sharing across the organization and automates the delivery of data products to cater to the needs of data consumers of all skill levels.   It integrates with various source systems to simplify the onboarding of data products, no matter where data resides.   Data producers can use Git protocol to package, operationalize and share reusable data products, which could include datasets, AI models and notebooks.   Business users and other data consumers can then quickly and easily discover curated data products and have them delivered in a format optimized for their use case.   This can help reduce friction and improve the quality, reliability and discovery of valuable enterprise data.

## Getting Started

#### Prerequisites

#### Build And Running
deploy the system to your server,you can get help from this repository:
```bash
https://github.com/GitDataAI/jzhub
```

clone JZHub repository to your server:

```bash
git clone git@github.com:GitDataAI/jzhub.git
```

Before you run the project for the first time, run the following script to install packages from `package.json`:
```bash
npm install
```
After waiting for the installation to complete,run the following script to start:
```bash
npm run dev
```

#### Cloud

[Try without installing](https://jzhub.io)


## Contributing

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
[![All Contributors](https://img.shields.io/github/all-contributors/GitdataAI/jzhub?color=ee8449&style=flat-square)](#contributors)
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

We welcome contributions! Please read our  for guidelines. Here’s how to get started:

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Submit a pull request.

#### Current Needs
1. Actions support.
2. UI enhancements.
3. Integration with LLM.

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


----
### License

Dual-licensed under [MIT](https://github.com/GitDataAI/jiaozifs/blob/main/LICENSE-MIT) + [Apache 2.0](https://github.com/GitDataAI/jiaozifs/blob/main/LICENSE-APACHE)

