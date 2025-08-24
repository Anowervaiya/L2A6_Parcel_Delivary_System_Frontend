export interface IParcelStatus {
  REQUESTED: 'REQUESTED';
  APPROVED: 'APPROVED';
  DISPATCHED: 'DISPATCHED';
  CANCELLED: 'CANCELLED';
  IN_TRANSIT: 'IN_TRANSIT';
  DELIVERED: 'DELIVERED';
}

export interface IParcelStatusLog {
  status: IParcelStatus;
  timestamp: Date;
  updatedBy:string;
  location?: string;
  note?: string;
}

export interface IParcel {
  _id?: string;
  trackingId: string;
  type: string;
  weight: number;
  fee: number;
  sender: string;
  receiver: string;
  deliveryAddress: string;
  deliveryDate: Date;
  currentStatus?: string;
  statusLogs?: IParcelStatusLog[];
  isBlocked?: boolean;
  isCancelled?: boolean;
}
