<template>
    <ElDialog
        title="报单详情"
      width="30%"
      :model-value="visible"
      align-center
      @update:model-value="handleCancel"
      @close="handleClose"
    >
    <ElDescriptions border>
        <ElDescriptionsItem :span="2"  label="订单号">
            {{ detail?.code }}
        </ElDescriptionsItem>
        <ElDescriptionsItem :span="1"  label="报单威客">
            {{ detail?.witkey }}
        </ElDescriptionsItem>
        <ElDescriptionsItem :span="1"  label="审核人员">
            {{ detail?.manage ? detail?.manage : "待审核" }}
        </ElDescriptionsItem>
        <ElDescriptionsItem :span="1"  label="结算状态">
            <ElTag :type="getStatus(detail?.status!).type">{{ getStatus(detail?.status!).text }}</ElTag>
        </ElDescriptionsItem>
        <ElDescriptionsItem :span="1"  label="结算类型">
            <ElTag :type="getType(detail?.type!).type">{{ getType(detail?.type!).text }}</ElTag>
        </ElDescriptionsItem>
        <ElDescriptionsItem :span="1"  label="结算金额">
            <ElTag type="primary">{{ `${detail?.amount}${site?.symbol}` }}</ElTag>
        </ElDescriptionsItem>
        <ElDescriptionsItem :span="1"  label="所得佣金">
            <ElTag type="primary">{{ `${detail?.commission}${site?.symbol}` }}</ElTag>
        </ElDescriptionsItem>
        <ElDescriptionsItem :span="1"  label="惩罚扣款">
            <ElTag type="primary">{{ `${detail?.deduction}${site?.symbol}` }}</ElTag>
        </ElDescriptionsItem>
        <ElDescriptionsItem :span="1"  label="平台抽成">
            <ElTag type="primary">{{ `${detail?.serviceCharge}${site?.symbol}` }}</ElTag>
        </ElDescriptionsItem>
        <ElDescriptionsItem :span="3"  label="结算时间">
            {{ detail?.settlementTime ?  detail?.settlementTime : "待审核" }}
        </ElDescriptionsItem>
        <ElDescriptionsItem :span="3"  label="申请时间">
            {{ detail?.createTime }}
        </ElDescriptionsItem>
        <ElDescriptionsItem :span="3"  label="备注">
            {{ detail?.remark }}
        </ElDescriptionsItem>
    </ElDescriptions>
    
    </ElDialog>
  </template>
  
<script setup lang="ts">
import { fetchGetSettlementDetail } from '@/api/settlement';
import { useSiteStore } from '@/store/modules/site';


interface Props {
    visible: boolean
    id?: number | null
}

interface Emits {
    (e: 'update:visible', value: boolean): void
    (e: 'submit'): void
}

const props = withDefaults(defineProps<Props>(), {
    visible: false,
    id: 0,
})

const emit = defineEmits<Emits>()

/**
 * 弹窗显示状态双向绑定
 */
const visible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
})
const SETTLEMENT_TYPE = {
  1: { type: 'primary' as const, text: '订单完成结算' },
  2: { type: 'primary' as const, text: '订单取消结算' },
  3: { type: 'primary' as const, text: '部分退款结算' },
} as const

const getType = (type: number) => {
  return (
    SETTLEMENT_TYPE[type as keyof typeof SETTLEMENT_TYPE] || {
      type: 'info' as const,
      text: '待审核'
    }
  )
}

const SETTLEMENT_STATUS = {
  1: { type: 'primary' as const, text: '待审核' },
  2: { type: 'success' as const, text: '已审核' },
} as const

const getStatus = (status: number) => {
  return (
    SETTLEMENT_STATUS[status as keyof typeof SETTLEMENT_STATUS] || {
      type: 'info' as const,
      text: '未知'
    }
  )
}
const {getInfo:site} = useSiteStore()
const detail = ref<Settlement.Response.Detail>()
const loading = ref<boolean>(false)
const getData = async () =>{
    loading.value = true
    const res = await fetchGetSettlementDetail({id:props.id!})
    detail.value = res
    loading.value = false
}


/**
 * 监听弹窗打开，初始化表单数据
 */
watch(
    () => props.visible,
    (newVal) => {
    if (newVal) init()
    }
)

/**
 * 初始化表单数据
 * 根据弹窗类型填充表单或重置表单
 */
const init = async () => {
    await getData()
}

/**
 * 关闭弹窗并重置表单
 */
const handleClose = () => {
    
}

/**
 * 取消操作
 */
const handleCancel = (): void => {
    handleClose()
    emit('update:visible', false)
}

/**
 * 提交表单
 * 验证通过后调用接口保存数据
 */
const handleSubmit = async () => {
    // if (!formRef.value) return
    // try {
    //     await formRef.value.validate()
    //     // TODO: 调用新增/编辑接口
    //     await fetchPostDistributeCancel(form)

    //     ElMessage.success('取消成功')
    //     emit('submit')
    //     handleClose()
    //     handleCancel()
    // } catch (error) {
    //     console.log('表单验证失败:', error)
    // }
}
</script>