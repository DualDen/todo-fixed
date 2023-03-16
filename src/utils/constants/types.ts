export type StringOrNullType = string | null;
export type ArrayOfType<T> = T[];
export type DispatchSetStateActionType<T> = React.Dispatch<
  React.SetStateAction<T>
>;

export interface ITodo {
  _id: string;
  todo: string;
  completed: boolean;
}