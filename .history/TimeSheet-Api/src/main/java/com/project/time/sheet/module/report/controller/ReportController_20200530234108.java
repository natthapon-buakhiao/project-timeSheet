package com.project.time.sheet.module.report.controller;

import java.util.List;

import com.project.time.sheet.common.models.ReportBean;
import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.module.report.models.ReqInquiryReport;
import com.project.time.sheet.module.report.models.ReqInsertReport;
import com.project.time.sheet.module.report.service.ReportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	
	@RequestMapping(value = "/inquiry", method = RequestMethod.POST)
	public ResponseEntity<ResponseModel<List<ReportBean>>> inquiryReport(@RequestBody ReqInquiryReport req){
		ResponseModel<List<ReportBean>> res = new ResponseModel<List<ReportBean>>();
		res = attendanceService.inquiryReport(req);
		return ResponseEntity.ok(res);
	}

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
	public ResponseEntity<ResponseModel> insertReport(@RequestBody ReqInsertReport req){
		
		ResponseModel res = new ResponseModel();
		
		res = reportService.insertReport(req);
		
		return ResponseEntity.ok(res);
	}
    
}