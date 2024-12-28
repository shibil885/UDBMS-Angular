export interface IUser {
    _id:string
    name: string;
    email: string;
    password: string;
    phone: string;
    profileImg:string | ArrayBuffer | null
    isActive?: boolean;
    isAdmin?: boolean;
    refreshToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }
  