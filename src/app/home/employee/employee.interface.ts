export interface Employee {
  id: number | null;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}

export class EmployeeDto {
  id?: number | null;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthDate?: Date;
  basicSalary?: number;
  status?: string;
  group?: string;
  description?: Date;

  constructor(
    employee: {
      username?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      birthDate?: Date;
      basicSalary?: number;
      status?: string;
      group?: string;
      description?: Date;
    } = {}
  ) {
    this.username = employee.username;
    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
    this.email = employee.email;
    this.birthDate = employee.birthDate;
    this.basicSalary = employee.basicSalary;
    this.status = employee.status;
    this.group = employee.group;
    this.description = employee.description;
  }
}
