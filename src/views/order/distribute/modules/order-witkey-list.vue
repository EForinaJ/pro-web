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
import { useTable } from '@/hooks';
import {  ElTag } from 'element-plus';
interface Props {
  id?: number;
}
const props = defineProps<Props>();
// 订单状态配置
const REPLACED_CONFIG = {
  1: { type: 'primary' as const, text: '否' },
  2: { type: 'danger' as const, text: '是' },
} as const

/**
 * 获取订单状态配置
 */
const getIsReplaced = (isReplaced: number) => {
  return (
    REPLACED_CONFIG[isReplaced as keyof typeof REPLACED_CONFIG] || {
      type: 'info' as const,
      text: '未知'
    }
  )
}

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
                type: "expand",
                formatter:(row)=>{
                    return  h('p', { }, row.reason != '' ? `变更原因: ${row.reason}` : '未变更')
                }
            },
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
                prop: 'isReplaced',
                label: '是否换下',
                formatter: (row) => {
                    const isReplaced = getIsReplaced(row.isReplaced)
                    return h(ElTag, { type: isReplaced.type }, () => isReplaced.text)
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