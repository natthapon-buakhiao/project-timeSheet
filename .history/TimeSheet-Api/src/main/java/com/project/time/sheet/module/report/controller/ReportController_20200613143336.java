package com.project.time.sheet.module.report.controller;

import java.util.List;

import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.common.models.UserProfileMsBean;
import com.project.time.sheet.module.report.models.ReqListStaff;
import com.project.time.sheet.module.report.service.ReportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(path = "/report")
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    ReportService reportService;

    
    @RequestMapping(value = "/list-staff", method = RequestMethod.POST)
    public ResponseEntity<ResponseModel<List<UserProfileMsBean>>> inquiryUserProfileStaff(ReqListStaff req){
        ResponseModel<List<UserProfileMsBean>> res = new ResponseModel<List<UserProfileMsBean>>();
        ReportService profileService;
		res = profileService.inquiryUserProfileStaff(req);
        return ResponseEntity.ok(res);
    }
	
	

    
}