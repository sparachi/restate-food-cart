import * as restate from "@restatedev/restate-sdk";

const foodOrderWorkflow = restate.workflow({
  name: "FoodOrderWorkflow",
  handlers: {
    run: async (
      ctx: restate.WorkflowContext,
      user: { name: string; email: string }
    ) => {
      // workflow ID = order ID; workflow runs once per user
      const orderId = ctx.key;

      // await ctx.run(() => createUserEntry(user));

      const secret = ctx.rand.uuidv4();
      // await ctx.run(() => sendEmailWithLink({ userId, user, secret }));

      const clickSecret = await ctx.promise<string>("link-clicked");
      return clickSecret === secret;
    },

    click: async (
      ctx: restate.WorkflowSharedContext,
      request: { secret: string }
    ) => {
      await ctx.promise<string>("link-clicked").resolve(request.secret);
    },
  },
});

restate.endpoint().bind(foodOrderWorkflow).listen(9080);