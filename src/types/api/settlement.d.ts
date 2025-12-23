declare namespace Settlement {
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
        interface Cancel {
            id?: number| null;
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
            type:number;
            amount:number;
            commission:number;
            deduction:number;
            serviceCharge:number;
            status:number;
            remark:string;
            settlementTime:string;
            createTime:string;
        }

    }
}