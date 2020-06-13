package com.project.time.sheet.module.report.models;

import lombok.Data;

@Data
public class ReqListStaff {
    private String lineManager;
    private String siteCode;

    @RequestMapping(value = "/list-staff", method = RequestMethod.POST)
    public ResponseEntity<ResponseModel<List<UserProfileMsBean>>> inquiryUserProfileStaff(ReqListProfile req){
        ResponseModel<List<UserProfileMsBean>> res = new ResponseModel<List<UserProfileMsBean>>();
        res = profileService.inquiryUserProfileStaff(req);
        return ResponseEntity.ok(res);
    }

}