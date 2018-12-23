import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';

export const myRxStompConfig: InjectableRxStompConfig = {

  brokerURL: 'ws://localhost:8080/socket',

  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 0, // Typical value 20000 - every 20 seconds

  reconnectDelay: 200,
  
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
};
