export enum ToggleModes {
  USER = 1,
  ADMIN = 2,
}

export type InfluenceType = "Сильное" | "Среднее" | "Почти не влияет";

export type UserFormInputs = {
  title: string;
  influence: InfluenceType;
};

export type AdminFormInputs = {
  username: string;
  password: string;
  password2: string;
};
