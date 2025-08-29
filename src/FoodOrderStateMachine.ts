import { xstate } from "@restatedev/xstate";
import { fromPromise } from "@restatedev/xstate/promise";
import * as restate from "@restatedev/restate-sdk";
import { setup } from "xstate";

export const machine = setup({
  types: {
    context: {} as {},
    events: {} as
      | { type: "CONFIRM" }
      | { type: "REJECT" }
      | { type: "ORDER_READY" }
      | { type: "OUT_FOR_DELIVERY" }
      | { type: "ORDER_SUBMITTED" }
      | { type: "ACCEPTED" }
      | { type: "REJECTED" }
      | { type: "DELIVERED" }
      | { type: "PICKED_UP" },
  },
  actions: {
    notifyCustomer: (_, params : { msgId: string }) => {
      console.log("Notifying customer with msgId:", params.msgId);
    },
    notifyOutForDelivery: (_, params : { msgId: string }) => {
      console.log("Notifying with msgId:", params.msgId);
    },
    notifyDriver: (_, params : { msgId: string }) => {
      console.log("Notifying driver with msgId:", params.msgId);
    },
  },
  actors: {
    createOrderService: fromPromise(async ({ }) => {
      return new Promise((resolve, reject) => {
        // Simulate order creation logic
        console.log("Creating order...");
        setTimeout(() => {
          // Simulate success or failure
          const isSuccess = Math.random() > 0.2; // 80% chance of success
          if (isSuccess) {
            console.log("Order created successfully.");
            resolve("OrderID12345");
          } else {
            console.log("Order creation failed.");
            reject(new Error("Failed to create order"));
          }
        }, 2000); // Simulate a delay for order creation
      });
    }),
  },
  guards: {
    isDeliveryOrder: function ({ context, event }) {
      console.log(`Checking if delivery order...`);
      return true;
    },
    isPickupOrder: function ({ context, event }) {
      console.log(`Checking if pickup order...`);
      return false;
    },
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDED2qIHkBOEzYFkBDAYwAsBLAOzADoKIAbMAYkwCUARAUXYH0AygFUAQgQCSAFUndOAbQAMAXUSgADqlgUALhVRVVIAB6IAjAGYFtACwBOe7YBMtgOznrAVgBsHgDQgAT0Q7AA5aLwiXZ1cXD2trFwBfRP80DBw8QlJKGloSbDAibTBUXHwWCH06agA3VABrOnzC4tLMxRUkEA0tXX1DEwQvFy9aR2tHR0sFd3MXCf8ghGsQ0diFBQ9bc1sJ6wtk1PQsMqzyaiaCopLTlnxsUto1RiKAM1KAWzyr1tOOwx6Oj0Bi6g1MW3CCm2OxCthCplMIXii2CHlMtFMkQUIXGrm8LiSKRAaROmWI51yAHciDpMFQAML6V4UbAfIrAlj0zAAOWQ4nYBH+XUBfRBoDBChctjG8McLhCOPhK3MKIQs1otkxUUcMxxrhCHkOxOOGXw5JydGptIZTJZbNFLHY3AAUtx6ZIhepNED+qCzJLpY5ZfLFaZlaq7NKPBsZhEZuZYUaSaazhangU1ERsNQoCm2FxeHwnQBBTgATU93W9ooGZjmYUcCIUXnc1mx4xCqvMcto5nxti8Co8k3BhKO6VO5ou6bAmezVFztw4PH4JfLclMnS9vWBtYQFnlYybLfi7ZWqvhtGjMamHlWCjb1iTJsn2WnVu0aGwnGzNXKxfpeluAABRkeRlABatdz9fcFVGYdzC8KE5RcMNTFVKYG2vBQgwsJxtmfCcyTfKkaU-UofwoP9sEdF03TAysRWg8UzDgq8piQpwCTQrtvFodYZnsCJtgNQjSTNEjqioIFrnpABXWBtFQD58HYMBXjkqgIAqKp6CoOpGloAoNK0+TFOU-BGKg30WIQSYkXCEIRnMbsvH1PxAkQOZHCvGMJlQh9zERMSUynXJqBk4ozKUlTsDUkztPuR5njeT4jPUzSIGiizsCsncbOMRB7OsRznNc9yu0cDxaBjB8RlsBQLGcELXwpOgIF-fBi1gLQoBobTMCESQ+GQDg+B4AAZcQADVeArCDhWssVCrsoMSsHMrHDc+UPKWTCxmw3CdmccwWuItraFQOTyO-MBGCo-AAhYSaZt4WQ8p9ZbBi2jwXBqg04QRFy+xGDCEwOm94WOgiiWTVq0yuCAAi-YCKBIeo5LUFhgPEekAGlZD4IRgI+msYMRVZ2MQ5DuP2C90WwnC+3vR9kiJKgMDgQw4fOi1IPyr7EAAWi8VURbOiSLoYZh+c+vcFk85ZNX+lyIjRKFlQl1Np2aa42nwWWydslzpXmRttg8bxJW7CMvB8qqNhcq3PAOWGX1598yLpRkqGZVl2QKpiCsGA0-oC+xJm2HUW1t+3rydpCXdOt2iMltM1AzLMcxTQ3mJW0xGx86w5mHBUdXmdDFdbGwtUmXVnB2rWwstMiv0o6jc+Dswoj+4dTE2cEcQRaxeKsEJge8YdJQ8bsm8kvTIrAbLYvizLO8Fuy6pq-Z4UxBrNSmLsXP468toamZC8NFPxO13IOoe7But6-r173HUgpq+VnGjXZi4wnCxiRgjkPeEOI54XSujdTgd0H5LG3HLGCuJRgPjcohaMqFUJgzCAJHCUN8LJ3HDfZu6UiBIxRmjDGahX7k1Qtg1wGxtj2HvJ2RWl4HBwnPisLYaJwFpn1tgZAclGDMkYMwCA1DbJBgATCSwQC64qkVqYOEvkNgF2cHKFyzZeHTgKAAKzACQYo4jFoCzfnYZB1hUE+ElKYTBVcXBWAds2ROOo4iu2SEAA */
  id: "FoodOrderMachine",
  initial: "idle",
  context: {},
  states: {
    idle: {
      on: {
        ORDER_SUBMITTED: { target: "createorder" },
      },
    },
    createorder: {
      invoke: {
        id: "createorder",
        src: 'createOrderService',
        onDone: {
          target: "waitOnConfirmation",
        },
        onError: {
          target: "idle",
        },
      },
    },
    waitOnConfirmation: {
      on: {
        CONFIRM: {
          target: "preparingOrder",
        },
        REJECT: {
          target: "rejected",
        },
      },
      entry: {
        type: "notifyCustomer",
        params: {
          msgId: "Order Confirmed",
        },
      },
    },
    preparingOrder: {
      on: {
        ORDER_READY: [
          {
            actions: [{
              type: "notifyDriver",
              params: {
                msgId: "OrderReady",
              },
            }],
            guard: "isDeliveryOrder",
            target: "waitForDriver",
          },
          {
            guard: "isPickupOrder",
            target: "readyForPickup",
          }
        ]
      }
    },
    waitForDriver: {
      on: {
        ACCEPTED: {
          target: "driverAssigned",
        },
        REJECTED: {
          target: "initiateCustomerRefund",
        },
      },
    },
    initiateCustomerRefund: {
      invoke: {
        id: "refundCustomer",
        src: fromPromise(async ({ }) => {
          return new Promise((resolve) => {
            // Simulate refund logic
            console.log("Initiating customer refund...");
            setTimeout(() => {
              console.log("Customer refunded successfully.");
              resolve(true);
            }, 2000); // Simulate a delay for refund processing
          });
        }),
        onDone: {
          target: "rejected",
        },
        onError: {
          target: "rejected",
        },
      },
    },
    driverAssigned: {
      on: {
        OUT_FOR_DELIVERY: {
          target: "outForDelivery",
        },
      },
      entry: [
        {
          type: "notifyCustomer",
          params: {
            msgId: "DriverAssigned",
          },
        },
        {
          type: "notifyOutForDelivery",
          params: {
            msgId: "Driver Out for Delivery",
          },
        },
      ],
    },
    outForDelivery: {
      on: {
        DELIVERED: {
          target: "orderFulfilled",
        },
      },
    },
    readyForPickup: {
      on: {
        PICKED_UP: {
          target: "orderFulfilled",
        },
      },
    },
    orderFulfilled: {
      type: "final",
      entry: {
        type: "notifyCustomer",
        params: {
          msgId: "OdrerFulfilled",
        },
      },
    },
    rejected: {
      type: "final",
    }
  }
});

await restate.endpoint().bind(xstate('FoodOrderStateMachine', machine)).listen(9081);

// await restate.serve({
//   services: [xstate("FoodOrderMachine", FoodOrderMachine)],
//   port: 9081,
// });