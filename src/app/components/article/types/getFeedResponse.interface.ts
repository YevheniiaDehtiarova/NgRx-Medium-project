import { ArticleInterface } from "./articleInterface";

export interface GetFeedResponseInterface {
    articles: Array<ArticleInterface>;
    articlesCount: number;

}