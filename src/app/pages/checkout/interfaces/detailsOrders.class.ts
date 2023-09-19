export class DetailsOrders {
  push(detailsOrder: DetailsOrders) {
    throw new Error('Method not implemented.');
  }
  constructor(
    public id: number,
    public orderId: number,
    public quantity: number,
    public productName: string
  ) {}
}
