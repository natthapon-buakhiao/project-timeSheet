package com.project.time.sheet.module.attendance.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.project.time.sheet.common.EnumCodeResponse;
import com.project.time.sheet.common.models.AttendanceBean;
import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.Attendance;
import com.project.time.sheet.entity.Project;
import com.project.time.sheet.entity.User;
import com.project.time.sheet.exception.DataNotFoundException;
import com.project.time.sheet.module.attendance.models.request.ReqInquiryAttendance;
import com.project.time.sheet.module.attendance.models.request.ReqInsertAttendance;
import com.project.time.sheet.repository.AttendanceRepository;
import com.project.time.sheet.repository.ProjectRepository;
import com.project.time.sheet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AttendanceService {

    @Autowired
    AttendanceRepository attendanceRepository;
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    UserRepository userRepository;

	// public ResponseModel<List<Attendance>> inquiryAttendance(ReqInquiryAttendance req) {
       
	// 	ResponseModel<List<Attendance>> res = new ResponseModel<List<Attendance>>();
	// 	try {
    //         List<Attendance> data = new ArrayList<Attendance>();
    //         User user = userRepository.getOne(req.getUserCode());
    //         Optional<Attendance> attandance = attendanceRepository.findByUser(user);
    //         if (attandance.isPresent()) {
    //                 data.add(attandance.get());
    //                 res.setData(data);
    //                 res.setCode(EnumCodeResponse.SUCCESS.getCode());
    //                 res.setMessage(EnumCodeResponse.SUCCESS.name());
    //             }
    //              else {
    //                  throw new DataNotFoundException("Data not found, Method : inquiryAttendance");
    //                 }
    //             }
    //             catch (DataNotFoundException e){
    //             res.setCode(e.getCode());
    //             res.setMessage(e.getMessage());
    //         } 
    //         catch (Exception e) {
    //             res.setCode(EnumCodeResponse.FAIL.getCode());
    //             res.setMessage(e.getMessage());
    //         }
    //         return res;
    // }

    public ResponseModel<List<AttendanceBean>> inquiryUserProject(ReqInquiryAttendance req) {
       
		ResponseModel<List<AttendanceBean>> res = new ResponseModel<List<AttendanceBean>>();
		try {
            List<AttendanceBean> data = new ArrayList<AttendanceBean>();
            User user = userRepository.getOne(req.getUserCode());
            List<Attendance> attendanceList = attendanceRepository.findByUserList(user);

            for(Attendance attendance : attendanceList) {
                AttendanceBean bean = new AttendanceBean();
                    BeanUtils.copyProperties(userProject, bean);
                    data.add(bean);
			}
				res.setData(data);
                res.setCode(EnumCodeResponse.SUCCESS.getCode());
                res.setMessage(EnumCodeResponse.SUCCESS.name());


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
                
                res.setCode(EnumCodeResponse.SUCCESS.getCode());
                res.setMessage(EnumCodeResponse.SUCCESS.name());

            }
            else {
                throw new DataNotFoundException("Data not found, Method : insertAttendance");
            }
			
			
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