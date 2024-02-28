export interface Reservation {
  _id?: { $oid: string };
  userId?: { $oid: string };
  eventId?: { $oid: string ,title:string};
  quantity?:Number;
  totalPrice?:Number;
  timestamp?:Date;
}
