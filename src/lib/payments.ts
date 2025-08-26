
export function processPayment(creditCard: string, paymentId: string) {
  console.log(`Processing payment with ID: ${paymentId} using credit card: ${creditCard}`);
  return Promise.resolve(`payRef-${paymentId}`);
}