import TEXT_TAGS from "constants/TextTags";
import { LinkType } from "./links";
import { RotatingTextItem } from "./rotatingText";
import {
  CmsIngredient,
  CmsIngredientMenu,
  CmsItem,
  CmsItemsMenu,
} from "./menus";

export type init = {
  texts: Array<CmsText>;
  media: any;
  languages: Array<language>;
  generalInfo: Array<GeneralInfo>;
  links: Array<LinkType>;
  metaTags: Array<metaTags>;
  iamRoles: Array<IAMRoleType>;
  itemsMenu: Array<CmsItemsMenu>;
  items: Array<CmsItem>;
  itemIngredients: Array<CmsIngredient>;
  ingredientsMenus: Array<CmsIngredientMenu>;
  modules: Array<ModuleType>;
};

export type generalInfoValue =
  | Array<generalInfoItem>
  | RotatingTextItem
  | generalInfoItem;

export type generalInfoItem = {
  _id: string;
  data: string;
};

export type GeneralInfo = {
  cmsTitle?: string;
  inputType: string;
  name: string;
  value: generalInfoValue;
  _id?: string;
};

export type language = {
  _id: string;
  lang: string;
};

export type metaTags = {
  _id: string;
  route: string;
  langId: string;
  fields: Array<metaTag>;
};

export type metaTag = {
  metaTagId: string;
  type: string;
  value: string;
};

export type CmsText = {
  key: string;
  tag: TextTagsKeys;
  value: TextValue;
};

type TextValue = {
  [key: string]: string;
};
export type AppTextType = {
  tag: TextTagsKeys;
  text: string;
};

export type TextTagsKeys = keyof typeof TEXT_TAGS;

export type moduleType = {
  bitwise: number;
  _id: string;
  title: string;
  route: string;
};

export type IAMRoleType = {
  _id: string;
  title: string;
  permissionBitwise: number;
};

export type UserType = {
  _id: string;
  roleId: string;
  username: string;
  uuid: string;
};

export type ModuleType = {
  bitwise: number;
  _id: string;
  title: string;
  route: string;
};
