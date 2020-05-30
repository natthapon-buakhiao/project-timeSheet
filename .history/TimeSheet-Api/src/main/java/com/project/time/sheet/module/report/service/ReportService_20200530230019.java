package com.project.time.sheet.module.report.service;

import com.project.time.sheet.repository.ReportRepository;
import com.project.time.sheet.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ReportRepository reportRepository;

    public ResponseModel insertAttendance(ReqInsertAttendance req) {
		
		ResponseModel res = new ResponseModel();
		
		try {
			
            Attendance newAttendance = new Attendance();
            User user = userRepository.getOne(req.getUserCode());
            Project project = projectRepository.getOne(req.getProjectCode());
            Optional<User> userCode = userRepository.findByUserCode(req.getUserCode());
            Optional<Project> projectCode = projectRepository.findByProjectCode(req.getProjectCode());

            if(userCode.isPresent() && projectCode.isPresent()){
                newAttendance.setUser(user);
                newAttendance.setDate(req.getDate());
                newAttendance.setProject(project);
                newAttendance.setTask(req.getTask());
                newAttendance.setSite(req.getSite());
                newAttendance.setTimeIn(req.getTimeIn());
                newAttendance.setTimeOut(req.getTimeOut());
                newAttendance = attendanceRepository.save(newAttendance);
                

            }
            else {
                throw new DataNotFoundException("Data not found, Method : insertAttendance");
            }

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