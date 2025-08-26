import * as restate from "@restatedev/restate-sdk";
import { FoodItem, FoodCartState } from "./types";

export const foodCartObject = restate.object({
    name: "foodCart",
    handlers: {
        add: async (ctx: restate.ObjectContext, req: FoodItem) => {
            // Get current state or initialize
            const state = (await ctx.get<FoodCartState>("state")) ?? { items: [] };
            state.items.push(req);
            await ctx.set("state", state);
            return `${req.name} added.`;
        },

        remove: async (ctx: restate.ObjectContext, req: FoodItem) => {
            // Get current state or initialize
            const state = (await ctx.get<FoodCartState>("state")) ?? { items: [] };
            state.items = state.items.filter(item => item.id !== req.id);
            await ctx.set("state", state);
            return `${req.name} removed.`;
        },

        getCartItems: restate.handlers.object.shared(
            async (ctx: restate.ObjectSharedContext) => {
                const state = (await ctx.get<FoodCartState>("state")) ?? { items: [] };
                return state.items;
            }
        ),
    },
});

restate.endpoint().bind(foodCartObject).listen();