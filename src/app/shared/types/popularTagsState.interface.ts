import { PopularTagType } from "./popularTag.type";

export interface PopularTagsStateInterface{
    data: Array<PopularTagType> | null;
    error: string | null,
    isLoading: boolean
}