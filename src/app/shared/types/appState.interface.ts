import { AuthStateInterface } from "src/app/auth/types/authState.interface";
import { ArticleStateInterface } from "src/app/components/article/types/articleState.interface";
import { CreateArticleStateInterface } from "src/app/components/create-article/store/types/createArticleState.interface";
import { EditArticleStateInterface } from "src/app/components/edit-article/store/types/editArticleStateInterface";
import { FeedStateInterface } from "src/app/components/feed/types/feedState.interface";
import { SettingsStateInterface } from "src/app/components/settings/types/settingsState.interface";
import { UserProfileStateInterface } from "src/app/components/user-profile/store/types/userProfileState.interface";
import { PopularTagsStateInterface } from "./popularTagsState.interface";

export interface AppStateInterface {
    auth: AuthStateInterface,
    feed: FeedStateInterface,
    popularTags: PopularTagsStateInterface,
    article: ArticleStateInterface,
    createArticle: CreateArticleStateInterface,
    editArticle: EditArticleStateInterface,
    settings: SettingsStateInterface,
    userProfile: UserProfileStateInterface
}