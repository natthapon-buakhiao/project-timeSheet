package com.project.time.sheet.module.report.service;

import java.util.Optional;

import com.project.time.sheet.common.EnumCodeResponse;
import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.Report;
import com.project.time.sheet.exception.DataNotFoundException;
import com.project.time.sheet.module.report.models.ReqInsertReport;
import com.project.time.sheet.repository.ReportRepository;
import com.project.time.sheet.repository.UserRepository;
import com.project.time.sheet.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ReportRepository reportRepository;

    public ResponseModel insertReport(ReqInsertReport req) {
		
		ResponseModel res = new ResponseModel();
		
		try {
			Report newReport = new Report();
            User user = userRepository.getOne(req.getUserCode());
            Optional<User> userCode = userRepository.findByUserCode(req.getUserCode());

            if(userCode.isPresent()){
                newReport.setUser(user);
                newReport.setStartDate(req.getStartDate());
                newReport.setEndDate(req.getEndDate());
                newReport.setT
                // newAttendance.setUser(user);
                // newAttendance.setDate(req.getDate());
                // newAttendance.setProject(project);
                // newAttendance.setTask(req.getTask());
                // newAttendance.setSite(req.getSite());
                // newAttendance.setTimeIn(req.getTimeIn());
                // newAttendance.setTimeOut(req.getTimeOut());
                newAttendance = attendanceRepository.save(newAttendance);
                

            }
            // else {
            //     throw new DataNotFoundException("Data not found, Method : insertAttendance");
            // }

            res.setCode(EnumCodeResponse.SUCCESS.getCode());
            res.setMessage(EnumCodeResponse.SUCCESS.name());
			
			
        }catch (DataNotFoundException e){
            res.setCode(e.getCode());
            res.setMessage(e.getMessage());
        }
        catch (Exception e) {
			res.setCode(EnumCodeResponse.FAIL.getCode());
			res.setMessage(e.getMessage());
		}
		
		return res;
	}
    
}