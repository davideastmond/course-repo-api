export interface INotification {
  _id: string;
  sourceId: string;
  targetId: string;
  url?: string;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}
