export class ReqInsertProject {
    projectCode: string;
    projectName: string;
    description: string;
    userCodeSupervisor: string;
    date: Date;
}

export class ReqRemoveProject {
    projectCode: string;
    userCodeSupervisor: string;
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

