export interface iLogin {
  token: string;
  user: employee;
}

export interface employee {
  id?: number;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  verifyCode: number;
  password: string;
}

export interface Department {
  id?: number;
  enName: string;
  arName: string;
  departmentId: number;
}
