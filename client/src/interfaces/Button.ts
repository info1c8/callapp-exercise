import { IUser } from "../interfaces";

export interface IAddButtonProps {
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IDeleteButtonProps {
  record: IUser;
}