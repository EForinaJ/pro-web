<template>
    <div class="art-full-height">
    <!-- 表格 -->
        <ArtTable
            :loading="loading"
            :data="data"
            :columns="columns"
            :pagination="pagination"
            @pagination:size-change="handleSizeChange"
            @pagination:current-change="handleCurrentChange"
        >
        </ArtTable>
    </div>
</template>

<script setup lang="ts">
import { fetchGetUserRechargeList } from '@/api/user';
import { RechargePayType } from '@/enums/typeEnum';
import { useTable } from '@/hooks';
import { useSiteStore } from '@/store/modules/site';
import { ElTag } from 'element-plus';
import { RechargeStatus } from '../../../../enums/statusEnum';
interface Props {
  id?: number;
}
const props = defineProps<Props>();

const {getInfo:site} = useSiteStore()

const {
    columns,
    data,
    loading,
    pagination,
    handleSizeChange,
    handleCurrentChange,
} = useTable({
    // 核心配置
    core: {
        apiFn: fetchGetUserRechargeList,
        apiParams:{
            id: props.id,
        },
        paginationKey:{
            current: 'page', 
            size: 'limit'
        },
        columnsFactory: () => [
            {
                prop: 'code',
                label: '充值单号',
                width: 260,
                formatter: (row) => {
                    return row.code
                }
            },
            {
                prop: 'money',
                label: '充值金额',
                formatter: (row) => {
                    return  h('div', { class: 'user flex-c gap-2' }, [
                        h('span', { class: 'text-sm' }, row.money + site.symbol!),
                    ])
                }
            },
            {
                prop: 'payType',
                label: '支付方式',
                formatter: (row) => {
                    const label: Record<number, string> = {
                        [RechargePayType.AlyPay]: '支付宝',
                        [RechargePayType.Wechat]: '微信支付',
                        [RechargePayType.Manual]: '客服预存',
                    };
                    return h(ElTag, { 
                        type: "primary"
                    }, {
                        default: () => label[row.payType]
                    })
                }
            },
            {
                prop: 'status',
                label: '充值状态',
                formatter: (row) => {
                    const label: Record<number, string> = {
                        [RechargeStatus.Pending]: '待支付',
                        [RechargeStatus.Success]: '已充值',
                    };
                    return h(ElTag, { 
                        type: "primary"
                    }, {
                        default: () => label[row.status]
                    })
                }
            },
            {
                prop: 'createTime',
                label: '充值时间',
                sortable: true
            },
        ],
    },
    // 数据处理
    transform: {
        responseAdapter: (response) => {
            return {
                records: response.list,
                total: response.total,
            };
        },
    },
})
</script>