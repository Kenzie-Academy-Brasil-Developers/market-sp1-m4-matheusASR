interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  calories?: number;
  section: "food" | "cleaning";
  expirationDate: Date;
}
interface IFoodProduct extends IProduct {
  section: "food";
}
interface ICleaningProduct extends IProduct {
  section: "cleaning";
}

interface IResponseCreateProduct {
  total: number;
  marketProducts: IProduct[]
}

type TProductRequest = Omit<IProduct, "id" | "expirationDate">;
type TProductUpdate = Partial<IProduct>;

export { IProduct, TProductRequest, TProductUpdate, ICleaningProduct, IFoodProduct, IResponseCreateProduct };
