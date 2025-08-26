import { xstate } from "@restatedev/xstate";
import { fromPromise } from "@restatedev/xstate/promise";

import { createMachine, setup } from "xstate";

const foodOrderWorkflow = setup({
  actors: {
    createOrderService: fromPromise(async ({ input }) => {
      // Simulate order creation logic
      return Promise.resolve({ orderId: "12345" });
    })
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5RQE4FcBGALTB5FEYKAdAJYQA2YAxAMIBKAogIIAqjA+rvQCKP0BtAAwBdRKAAOAe1ikALqSkA7cSAAeiAIwAmAGzFtAVl1GA7EIAsQ47t0AOADQgAnltMXihodbtCAnJpeugDMdhYAvuFOqJg4GPiEJADGKGAAhnJgUgRE1BDKYGRKAG5SANaFKemZALTZicJiSCDSsgrKqhoIuoZ+xJpCgRamhsEmwdoWTq4IA4bEfot+piumdqaaFnaGkdHo2Hg5yakZWUfURCjZxBIUGQBm2QC2xFWndUeNqq3yiirNXU0wSEnm8YKMmm22j8jhciD8IKEdgmFmG2m0mhCxl2IBiB3iR1eynupBQTzSGCodFwADkAGIASXoAFkvs0fu1-qAujDTMRghYxiNDMjRn5tNN4XZiEiJgjxRNvNscXi4gkiESlCSyRSqUwAFKMWisNmSGS-DoAqV84JBWwKvSaTSS2buUE+fyBIQhMIq-ZqwlJYmkp6Qag8egMgBq-A4zAAyvGGQBxGmMHimlrmzmdLTaczECwY3QBDF+QwVqZwhABYi2WzogKmcWQ3R+2KHRKa7WhiDUbh8egcJjMHgATUzHL+udm+ZBRcxpc05crLox2kLmJMJeCwRGdmR7fx6pIEBQpGKRGYsFkUCUYYACgzaABpACqD+HLHHk+z06tsxYp42i7pMB7NtCVYzLW9YmNCmgQa2R4Bl2EikEkZRoBI9DpBAzj9m+rAcHS3AcHwAAy0b8BOojfH+lrclofi6Ii5jaGEhhbEIpgStW4qFksxgQkYhiQshnYamhGFYThaR4dQdJvuRjLkeRv5tP+jGzMxrFCOxFicb4PFrkCBgWIsLF6OY4raOJBJdlIaByHS2Q8GAFAXkQ+GKcpDKqepFpcuoiAgRMhb2Lo5lCjoPQuvx5mLEJokiWJOJKFIhDwM0qoSSgdEaQxwUIDUugujU8xLLyB4CgMwQwnZJ5kJQYD5YFM5FnFHiwUWQR+FYToNYGJyZPURCtTmAHBJidYIQh7i9EC6wunYmgCYsdgBFFIqmMEg1dkGWohrqLXsvRQVdGE+iViEEyGPmO2ldWAweJVIrimEza+lEuL+rl3YhpA42aUVTq7gY+7bAhzGmCYcXSiKcr+CB2hKjs305fZGqpAAVmASSZBAQOFTy5b9DtkKosiyJbGue78oYay6JigpbDCdh7RqZ6eSg163vehOnQV51aMMq0hHOgyBOxfhxRuW4lr4RZ2CjFhtujv2YyQUmYdhuEzGaQszpCTrEGEYyiQeCGw3xfQWFukxGD0NV+BzJCOc5rnudz+tZobAEYhshbQkznHlruYyywsgkmMlFa2erHaa8Q9xoBQJIUFQAsG21-sGcEdYTOs9g6E6thxbbW48Riqsiv4kSREAA */
  id: "FoodOrderMachine",
  initial: "idle",
  states: {
    idle: {
      on: {
        CREATE_ORDER: "createorder"
      }
    },
    createorder: {
      invoke: {
        id: "create-order",
        src: "createOrderService",
        onDone: { target: "confirmable" },
        onError: { target: "idle" }
      }
    },
    confirmable: {
      on: {
        CONFIRM: "confirmed",
        REJECT: "rejected"
      }
    },
    confirmed: {
      on: {
        DRIVER_ASSIGNED: "driverAssigned",
        ORDER_READY: "pickupReady"
      }
    },
    rejected: {
      type: "final"
    },
    driverAssigned: {
      on: {
        PICKUP_READY: "pickupReady"
      }
    },
    pickupReady: {
      on: {
        OUT_FOR_DELIVERY: "outForDelivery",
        FULFILL: "fulfilled"
      }
    },
    outForDelivery: {
      on: {
        FULFILL: "fulfilled"
      }
    },
    fulfilled: {
      type: "final"
    }
  }
});