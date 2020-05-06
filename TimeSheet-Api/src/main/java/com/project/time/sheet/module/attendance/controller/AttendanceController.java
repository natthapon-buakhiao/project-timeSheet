package com.project.time.sheet.module.attendance.controller;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.Attendance;
import com.project.time.sheet.module.attendance.models.request.ReqInsertAttendance;
import com.project.time.sheet.module.attendance.models.request.reqAttendance;
import com.project.time.sheet.module.attendance.service.AttendanceService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(path = "/attendance")
@CrossOrigin(origins = "*")

public class AttendanceController {
    
    @Autowired
	AttendanceService attendanceService;


    @RequestMapping(value = "/inquiry", method = RequestMethod.GET)
	public ResponseEntity<ResponseModel<List<Attendance>>> inquiry(){
		ResponseModel<List<Attendance>> res = new ResponseModel<List<Attendance>>();
		res = attendanceService.inquiryAttendance();
		return ResponseEntity.ok(res);
    }
    

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
	public ResponseEntity<ResponseModel> insert(@RequestBody ReqInsertAttendance req){
		
		ResponseModel res = new ResponseModel();
		
		res = attendanceService.insertAttendance(req);
		
		return ResponseEntity.ok(res);
	}

	@RequestMapping(value = "/reqAttendance", method = RequestMethod.POST)
   public String ReqAttendance(@RequestBody reqAttendance req) {

	RestTemplate restTemplate = new RestTemplate();
      HttpHeaders headers = new HttpHeaders();
      headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
      HttpEntity<reqAttendance> entity = new HttpEntity<reqAttendance>(req,headers);

      
      return restTemplate.exchange(
         "https://dev.priorsolution.co.th/iam/v2/auth/sign-in", HttpMethod.POST, entity, String.class).getBody();

      // return "55555555555555555";
   }

   @RequestMapping(value = "/gg")
   public String gg(){
      
      
      return "ggggggggggggg";
   }

	
}