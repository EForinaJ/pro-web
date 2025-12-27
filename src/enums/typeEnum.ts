export enum SexType {
  Male = 1,      // 男
  Female = 2,    // 女
  Other = 3,     // 其他
}

export enum ChangeBalanceType {
  UserChangeBalanceTypeSystem = 1,      // 系统变更
  UserChangeBalanceTypeRecharge = 2,      // 用户充值
}

export enum ChangeCommissionType {
  WitkeyChangeBalanceTypeSystem = 1,      // 系统变更
  WitkeyChangeBalanceTypeSettlement = 2,      // 报单结算
}

export enum RechargePayType {
  AlyPay = 1,      // 支付宝
  Wechat = 2,      // 微信
  Manual = 3,      // 客服预存
}


export enum AfterSalesType {
  ServiceNotCompleted = 1,      // 服务无法完成
  Cheater = 2,      // 威客作弊
  Other = 3,      // 其他
}

export enum PayMode {
  AlyPay = 1,// 支付宝
  Wechat = 2,// 微信
  Balance = 3,// 余额
  PersonalTransfer = 4,// 人工转账
}

export enum WithdrawType {
  AlyPay = 1,      // 支付宝
  Wechat = 2,      // 微信
}
