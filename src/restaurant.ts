import * as restate from "@restatedev/restate-sdk";
import { processPayment } from "./lib/payments.ts";
import { FoodOrderRequest } from "./types.ts";

const restaurantService = restate.service({
  name: "Restaurant",
  handlers: {
    confirmOrder: async (ctx: restate.Context, req: FoodOrderRequest) => {
      const paymentId = ctx.rand.uuidv4();

      const payRef = await ctx.run(() =>
        processPayment(req.creditCard, paymentId)
      );
      return `Order confirmed for user ${req.userId} and payment reference is ${payRef}`;
    },
    handOverFoodItems: async (ctx: restate.Context, req: FoodOrderRequest) => {
      // Logic to hand over food items to the delivery service
      console.log(`Handing over food items for user: ${req.userId}, to delivery driver.`);
      return `Food items for user ${req.userId} handed over to delivery service.`;
    }
  },
});

restate.endpoint().bind(restaurantService).listen(8011);