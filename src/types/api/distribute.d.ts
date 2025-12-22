declare namespace Distribute {
    namespace Params {
        type Query = {
            page: number;
            limit: number;
            name?: string;
            code?: string;
        }
        interface Model {
            witkeyId?: number| null;
            code: string | null;
        }
    }
    namespace Response {
       
        type Info = {
            id: number;
            code:string;
            manage: string;
            witkey:string;
            game:string;
            title:string;
            isCancel:number;
            createTime:string;
        }
        type List = Api.Common.PaginatedResponse<Info>

        
        type Edit = {
            id?: number | null,
            name: string | null;
            gameId:number | null;
            pic: string | null;
            description: string | null;
        }
    }
}