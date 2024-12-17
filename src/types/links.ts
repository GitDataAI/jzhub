export type linkItem = {
  path: string;
  name: string;
  isExternalLink: boolean;
};

export type linksItem = {
  title: string;
  links: linkItem[];
};
