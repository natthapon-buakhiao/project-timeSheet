export class ReqInsertAttendance{
    userCode:string
    date:Date
    projectCode:string
    task:string
    siteCode:string
    timeIn:string
    timeOut:string
}

export class ReqEditAttendance{
    id:number
    date:Date
    projectCode:string
    task:string
    siteCode:string
    timeIn:string
    timeOut:string
}

export class RequestInquiryAttendace {
    userCode: string;
    date: Date;
}

export class Excel{
    public id:string
    public user:string
    public date:string
    public project:string
    public task:string
    public site:string
    public timeIn:string
    public timeOut:string
}

export class DataSite {
    siteCode:string
}