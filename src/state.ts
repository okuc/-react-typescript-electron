export interface webState {
    title: string;
    top: {
      station: number;
      receiver: string;
      custom: string;
      saler: string;
      time: Date;
      sid: string;
    };
    content: {
      name: string;
      num: number;
      price: number;
      all: number;
    }[];
    bottom: {
      all: number;
      receipts: number;
      payment: number;
      change: number;
      printTime: Date;
      welcom: string;
    };
  }
  let initState:webState = {
    title: "康德大药店铺货单",
    top: {
      station: 101,
      receiver: "史贵芳",
      custom: "李三总",
      saler: "史贵芳",
      time: new Date(),
      sid: "XH-",
    },
    content: [],
    bottom: {
      all: 0,
      receipts: 0,
      payment: 0,
      change: 0,
      printTime: new Date(),
      welcom: "欢迎再次光临！"
    }
  }

  export default initState