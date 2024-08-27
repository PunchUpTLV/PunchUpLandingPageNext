export interface LinkType {
  _id: string;
  link: string;
  linkType: string;
  media: string;
  name: string;
  titles?: LinkTitles;
}

type LinkTitles = {
  [key: string]: string;
};
