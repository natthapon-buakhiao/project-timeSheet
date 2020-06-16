// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const Apiurl = "http://localhost:8091/time-sheet";
export const environment = {
  production: false,
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

