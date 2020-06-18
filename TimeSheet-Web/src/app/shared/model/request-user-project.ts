export class RequestInquiryUser {
    userCode: string;
}

export class RequestInquiryProject {
    projectCode: string;
}

export class ReqInsertUserProject {
    projectCode: string;
    task: string;
    userCode: string;
    date: Date;
}
