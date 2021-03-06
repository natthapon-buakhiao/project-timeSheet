package com.project.time.sheet.module.report.controller;

import com.project.time.sheet.module.report.service.ReportService;

import org.springframework.beans.factory.annotation.Autowired;
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

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
	public ResponseEntity<ResponseModel> insert(@RequestBody ReqInsertAttendance req){
		
		ResponseModel res = new ResponseModel();
		
		res = attendanceService.insertAttendance(req);
		
		return ResponseEntity.ok(res);
	}
    
}