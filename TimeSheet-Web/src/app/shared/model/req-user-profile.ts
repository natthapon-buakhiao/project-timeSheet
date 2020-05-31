export class ReqInsertUserProfile {
    userCode: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    age: number;
    address: string;
    position: string;
    site: string;
}

export class ReqEditUserProfile {
    userCode: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    age: number;
    address: string;
    position: string;
    site: string;
}

export class RequestInquiryProfile {
    userCode: string;
}


export class RequestInquiryStaffProfile {
    lineManager: string;
}
