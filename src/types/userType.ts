export default interface UserType {
    employeeId: number;
    profileId: number;
    profileStatus: number;
    firstName: string;
    lastName: string;
    outlet: string;
    outletTemplate: number;
    designation: number;
    passportNo: string | null;
    dateOfBirth: string | null; // or Date if you're handling it as a Date object
    gender: string | null;
    email: string;
    phoneNumber: string;
    signUp: string; // or Date if you're handling it as a Date object
    createdAt: string; // or Date if you're handling it as a Date object
    updatedAt: string; // or Date if you're handling it as a Date object
    salt: string | null;
    isDeveloper: number; // 1 for true, 0 for false
    access_token: string;
  }