interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  expirationDate: Date;
}

interface ICleaningProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "cleaning";
  expirationDate: Date;
}

interface IFoodProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food";
  expirationDate: Date;
  calories: number;
}

export { IProduct, IFoodProduct, ICleaningProduct };
