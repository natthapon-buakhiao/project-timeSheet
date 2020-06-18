const Apiurl = "http://localhost:8091/time-sheet";
export const environment = {
  production: true,
  service: {
    auth: {
      endPoint: Apiurl + "/iam/login"
    },
    user: {
      endPoint: Apiurl + "/user"
    },
    profile: {
      endPoint: Apiurl + "/profile"
    },
    userproject: {
      endPoint: Apiurl + "/userproject"
    },
    project: {
      endPoint: Apiurl + "/project"
    },
    attendance: {
      endPoint: Apiurl + "/attendance"
    },
    site: {
      endPoint: Apiurl + "/site"
    },
    report: {
      endPoint: Apiurl + "/report"
    },
    profileIam: {
      endPoint: Apiurl + "/iam"
    },
  }
  
};
