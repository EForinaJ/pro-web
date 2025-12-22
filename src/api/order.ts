import request from '@/utils/http'

export function fetchGetOrderList(params: Order.Params.Query) {
    return request.get<Order.Response.List>({
      url: '/order/list',
      params
    })
}

export function fetchPostOrderAddDiscount(data: Order.Params.AddDiscount) {
  return request.post({
    url: '/order/add/discount',
    data
  })
}

export function fetchPostOrderPaid(data:{id:number}) {
  return request.post({
    url: '/order/paid',
    data
  })
}
export function fetchPostOrderCancel(data:{id:number}) {
  return request.post({
    url: '/order/cancel',
    data
  })
}
export function fetchPostOrderDistribute(data:Order.Params.Distribute) {
  return request.post({
    url: '/order/distribute',
    data
  })
}
export function fetchPostOrderRefund(data:Order.Params.Refund) {
  return request.post({
    url: '/order/refund',
    data
  })
}
export function fetchPostOrderChangeWitkey(data:Order.Params.ChangeWitkey) {
  return request.post({
    url: '/order/change/witkey',
    data
  })
}
export function fetchGetOrderDetail(params: {id:number}) {
  return request.get<Order.Response.Detail>({
    url: '/order/detail',
    params
  })
}

export function fetchGetOrderWitkeyList(params: {
  id: number,
  page: number,
  limit: number
}) {
  return request.get<Order.Response.WitkeyList>({
    url: '/order/witkey/list',
    params
  })
}