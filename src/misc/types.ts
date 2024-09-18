export type Region = {
  id: number;
  name: string;
};

export type FilterName = "region" | "price" | "area" | "room";
export type MinMaxFilterType = {
  min: number;
  max: number;
};
