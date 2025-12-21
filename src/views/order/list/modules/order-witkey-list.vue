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
import { fetchGetOrderWitkeyList } from '@/api/order';
import { ServiceStatus } from '@/enums/statusEnum';
import { useTable } from '@/hooks';
import {  ElRate, ElTag } from 'element-plus';
interface Props {
  id?: number;
}
const props = defineProps<Props>();


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
        apiFn: fetchGetOrderWitkeyList,
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
                label: '威客名称',
                width: 160,
            },
            {
                prop: 'game',
                label: '游戏领域',
                formatter: (row) => {
                    return h(ElTag, { type:"primary" }, () => row.game )
                }
            },
            {
                prop: 'title',
                label: '所属头衔',
                formatter: (row) => {
                    return h(ElTag, { type:"primary" }, () => row.title )
                }
            },
            {
                prop: 'createTime',
                label: '接单时间',
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