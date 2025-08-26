import * as restate from "@restatedev/restate-sdk";
import { createRecurringPayment } from "./lib/payments";
import { FoodOrderRequest } from "./types";

const restaurantService = restate.service({
  name: "RestaurantService",
  handlers: {
    confirmOrder: async (ctx: restate.Context, req: FoodOrderRequest) => {
      const paymentId = ctx.rand.uuidv4();

      const payRef = await ctx.run(() =>
        createRecurringPayment(req.creditCard, paymentId)
      );
    },
    handOverFoodItems: async (ctx: restate.Context, req: FoodOrderRequest) => {
      // Logic to hand over food items to the delivery service
      console.log(`Handing over food items for user: ${req.userId}, to delivery driver.`);
      return `Food items for user ${req.userId} handed over to delivery service.`;
    }
  },
});

restate.endpoint().bind(restaurantService).listen(9080);