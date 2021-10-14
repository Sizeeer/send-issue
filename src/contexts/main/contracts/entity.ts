export enum StatusesMain {
  LOADING = "Main/LOADING",
  ERROR = "Main/ERROR",
  NEVER = "Main/Never",
}

export interface MainState {
  status: StatusesMain;
  error?: string;
  route: string;
}
