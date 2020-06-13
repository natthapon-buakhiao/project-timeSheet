package com.project.time.sheet.module.report.models;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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