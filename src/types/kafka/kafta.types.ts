export type Kafkahandler = {
  [key: string]: (payload: any) => Promise<void>;
};
