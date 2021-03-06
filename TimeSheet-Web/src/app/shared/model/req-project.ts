export class ReqInsertProject {
    projectCode: string;
    projectName: string;
    description: string;
    userCodeSupervisor: string;
    date: Date;
}

export class ReqRemoveProject {
    projectCode: string;
}

export class ReqEditProject {
    projectCode: string;
    projectName: string;
    description: string;
    userCodeSupervisor: string;
    date: Date;
}

export class RequestInquiryProfile {
    userCode: string;
}

export class RequestInquirySup {
    userCodeSupervisor: string;
}

