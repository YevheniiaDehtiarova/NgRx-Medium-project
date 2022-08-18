import { ProfileInterface } from "./profileInterface";

export interface ArticleInterface{
    author?: ProfileInterface;
    body: string;
    title: string;
    createdAt?: string;
    description: string;
    favorited?: boolean;
    favoritesCount?: number;
    slug?: string;
    tagList: Array<string>;
    updatedAt?: string;
}