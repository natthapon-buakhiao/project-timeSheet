package com.project.time.sheet.module.userProject.controller;

import java.util.List;

import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.common.models.UserProjectBean;
import com.project.time.sheet.entity.UserProject;
import com.project.time.sheet.module.userProject.models.ReqInquiryUserProject;
import com.project.time.sheet.module.userProject.models.ReqInquiryUserProjectCode;
import com.project.time.sheet.module.userProject.models.ReqInsertUserProject;
import com.project.time.sheet.module.userProject.service.UserProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/userproject")
public class UserProjectController {

    @Autowired
    UserProjectService userProjectService;

    @RequestMapping(value = "/inquiry-project", method = RequestMethod.POST)
	public ResponseEntity<ResponseModel<List<UserProjectBean>>> inquiryUserProject(@RequestBody ReqInquiryUserProject req){
		ResponseModel<List<UserProjectBean>> res = new ResponseModel<List<UserProjectBean>>();
		res = userProjectService.inquiryUserProject(req);
		return ResponseEntity.ok(res);
    }
    
    // @RequestMapping(value = "/inquiry-userproject", method = RequestMethod.POST)
	// public ResponseEntity<ResponseModel<List<UserProjectBean>>> inquiryProject(@RequestBody ReqInquiryUserProjectCode req){
	// 	ResponseModel<List<UserProjectBean>> res = new ResponseModel<List<UserProjectBean>>();
	// 	res = userProjectService.inquiryUserProject(req);
	// 	return ResponseEntity.ok(res);
	// }

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public ResponseEntity<ResponseModel> insertUserProject(@RequestBody ReqInsertUserProject req){
        
        ResponseModel res = new ResponseModel();
        
        res = userProjectService.insertUserProject(req);
        
        return ResponseEntity.ok(res);
    }
    
}