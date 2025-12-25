declare namespace Settlement {
    namespace Params {
        type Query = {
            page: number;
            limit: number;
            name?: string;
            code?: string;
        }
        interface Apply {
            id?: number| null;
            status: number;
            reason: string | null;
        }
    }
    namespace Response {
       
        type Info = {
            id: number;
            code:string;
            manage: string;
            witkey:string;
            amount:number;
            status:number;
            createTime:string;
        }
        type List = Api.Common.PaginatedResponse<Info>

        type Detail = {
            id: number;
            code:string;
            manage: string;
            witkey:string;
            amount:number;
            commission:number;
            serviceCharge:number;
            status:number;
            reason:string;
            images:string[];
            createTime:string;
        }

    }
}