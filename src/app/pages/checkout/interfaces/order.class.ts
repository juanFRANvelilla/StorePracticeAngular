export class Order {
    constructor(
      public id: number,
      public name: string,
      public date: string,
      public store: string,
      public shoppingAddress: string,
      public city: string,
      public pickup: boolean
    ) {}
  }