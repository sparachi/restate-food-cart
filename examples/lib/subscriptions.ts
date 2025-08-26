
export function createSubscription(userId: string, subscription: string) {
    console.log(`Creating subscription for user: ${userId} with subscription: ${subscription}`);
    return Promise.resolve(`subRef-${userId}-${subscription}`);
}