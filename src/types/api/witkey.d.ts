declare namespace Witkey {
    namespace Params {
        /** 角色搜索参数 */
        type Query = Partial<
            Pick<'name' | 'phone'> &
            Api.Common.CommonSearchParams
        >
        interface Model {
            id?: number | null,
            titleId: number | null;
            gameId: number| null;
            userId: number| null;
            album: string[];
            rate: number;
        }

        interface ChangeCommission {
            id?: number | null,
            mode: number | null;
            money: number | null;
            remark: string | null;
        }

        interface Recharge {
            id?: number;
            money: number | null;
        }
    }
    namespace Response {
       
        type Info = {
            id: number;
            user: {
                name:string;
                avatar:string;
                phone:string;
            };
            game: string;
            title: string;
            commission: number;
            rate: number;
            createTime: string;
        }
        type List = Api.Common.PaginatedResponse<Info>

        
        type Edit = {
            id?: number | null,
            titleId: number | null;
            gameId: number| null;
            userId?: number| null;
            album: string[];
            rate: number;
        }
        type Detail = {
            id: number;
            user: {
                name:string;
                avatar:string;
                phone:string;
            };
            game: string;
            title: string;
            commission: number;
            rate: number;
            album: string[];
            createTime: string;
        }

        type CommissionList = Api.Common.PaginatedResponse<{
            id: number;
            related:string;
            type:number;
            after:number;
            before:number;
            money:number;
            mode:number;
            remark:string;
            createTime: string;
        }>
        type RechargeList = Api.Common.PaginatedResponse<{
            id: number;
            code:string;
            money:number;
            payType:number;
            status:number;
            createTime: string;
        }>
        type Logs = Api.Common.PaginatedResponse<{
            id: number;
            name: string;
            createTime: number;
            content: string;
            mode: number;
            status:number;
            createTime: string;
        }>
    }
}