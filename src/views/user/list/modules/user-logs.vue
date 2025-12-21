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
import { fetchGetUserLogs, fetchGetUserRechargeList } from '@/api/user';
import { FundMode, UserLogMode } from '@/enums/modeEnum';
import { ChangeBalanceType, RechargePayType } from '@/enums/typeEnum';
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
        apiFn: fetchGetUserLogs,
        apiParams:{
            id: props.id,
        },
        paginationKey:{
            current: 'page', 
            size: 'limit'
        },
        columnsFactory: () => [
        {
                prop: 'name',
                label: '操作人',
            },
            {
                prop: 'mode',
                label: '操作类型',
                width: 260,
                formatter: (row) => {
                    const label: Record<number, string> = {
                        [UserLogMode.Create]: '新增用户',
                        [UserLogMode.Edit]: '编辑用户',
                        [UserLogMode.Recharge]: '充值预存',
                        [UserLogMode.Balance]: '变更余额',
                    };
                    return h(ElTag, { 
                        type: "primary"
                    }, {
                        default: () => label[row.mode]
                    })
                }
            },
            {
                prop: 'content',
                label: '操作内容',
            },
            {
                prop: 'createTime',
                label: '操作时间',
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