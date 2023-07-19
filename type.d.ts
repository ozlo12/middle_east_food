declare interface Meal {
  id?: string;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  createdAt: string;
}

declare interface ContactUs {
  name: string;
  email: string;
  phone: string;
  message: string;
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

declare interface User {
  contact: Contact;
  cart: Cart;
  orders: Order[];
}

declare interface Order {
  id?: string;
  cart: Cart;
  contact: Contact;
  createdBy: string;
  createdAt: string;
  payment: "cash" | "card";
  extraInformation: string;
  status: "new" | "completed";
}
