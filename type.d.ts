declare interface Meal {
  id?: string;
  name: string;
  image: string;
  description: string;
  gategory: string;
  price: number;
  createdAt: string;
}

declare interface Cart {
  items: { item: Meal; quantity: number }[];
  totalPrice: number;
}

declare interface Contact {
  name: string;
  email: string;
  address: string;
  postcode: string;
  city: string;
  phone: string;
}

declare interface Order {
  id?: string;
  cart: Cart;
  createdById: string;
  createdAt: string;
  deleverTo: Contact;
  extraInformation: string;
}

declare interface User {
  contact: Contact;
  cart: Cart;
  orders: Order[];
}
