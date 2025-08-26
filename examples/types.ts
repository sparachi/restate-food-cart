export type FoodItem = {
    id: string;
    name: string;
    quantity: number;
};

export type FoodCartState = {
    items: FoodItem[];
};

export type FoodOrderRequest = {
  userId: string;
  creditCard: string;
  foodItems: FoodCartState["items"];
};

