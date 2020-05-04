package com.project.time.sheet.module.attendance.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.project.time.sheet.common.EnumCodeResponse;
import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.Attendance;
import com.project.time.sheet.module.attendance.models.request.ReqInsertAttendance;
import com.project.time.sheet.repository.AttendanceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AttendanceService {

    @Autowired
    AttendanceRepository attendanceRepository;

    public ResponseModel<List<Attendance>> inquiryAttendance() {
		ResponseModel<List<Attendance>> res = new ResponseModel<List<Attendance>>();
		try {
			List<Attendance> attendanceList = new ArrayList<Attendance>();
			attendanceList = attendanceRepository.findAll();
			res.setCode(EnumCodeResponse.SUCCESS.getCode());
			res.setMessage(EnumCodeResponse.SUCCESS.name());
			res.setData(attendanceList);
		}catch (Exception e) {
			res.setCode(EnumCodeResponse.FAIL.getCode());
			res.setMessage(e.getMessage());
		}
		return res;
    }
    
    public ResponseModel insertAttendance(ReqInsertAttendance req) {
		
		ResponseModel res = new ResponseModel();
		
		try {
			
			Attendance newAttendance = new Attendance();
			
			newAttendance.setTask(req.getTask());
	
			
			newAttendance = attendanceRepository.save(newAttendance);
			
			res.setCode(EnumCodeResponse.SUCCESS.getCode());
			res.setMessage(EnumCodeResponse.SUCCESS.name());
			
		}catch (Exception e) {
			res.setCode(EnumCodeResponse.FAIL.getCode());
			res.setMessage(e.getMessage());
		}
		
		return res;
	}

}