export class BlogModel{
    id?:string;
    title: string = "";
    subTitle: string = "";
    mainImage?: any;
    content: string = "";
    appUserId?: string;
    categoryId?: string;
    category?: any;
    viewCount?: number;
    likeCount?: number;
    commentCount?: number;
    createdDate?:any;
    author?:any;
}