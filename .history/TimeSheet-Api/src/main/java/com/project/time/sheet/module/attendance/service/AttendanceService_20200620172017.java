package com.project.time.sheet.module.attendance.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.TimeZone;
import com.project.time.sheet.common.EnumCodeResponse;
import com.project.time.sheet.common.models.AttendanceBean;
import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.Attendance;
import com.project.time.sheet.entity.Project;
import com.project.time.sheet.entity.Site;
import com.project.time.sheet.entity.User;
import com.project.time.sheet.exception.DataNotFoundException;
import com.project.time.sheet.module.attendance.models.request.ReqEditAttendance;
import com.project.time.sheet.module.attendance.models.request.ReqInquiryAttendance;
import com.project.time.sheet.module.attendance.models.request.ReqInsertAttendance;
import com.project.time.sheet.module.attendance.models.request.ReqRemoveAttendance;
import com.project.time.sheet.repository.AttendanceRepository;
import com.project.time.sheet.repository.ProjectRepository;
import com.project.time.sheet.repository.SiteRepository;
import com.project.time.sheet.repository.UserRepository;
import org.springframework.beans.BeanUtils;
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
    @Autowired
    SiteRepository siteRepository;

    public ResponseModel<List<AttendanceBean>> inquiryAttendance(ReqInquiryAttendance req) {

        ResponseModel<List<AttendanceBean>> res = new ResponseModel<List<AttendanceBean>>();

        try {
            Locale locale = new Locale("Asia", "Bangkok");
            TimeZone tz = TimeZone.getTimeZone("UTC+7");
            String month;
            Calendar cal = Calendar.getInstance(tz, locale);
            cal.setTime(req.getDate());

            if (cal.get(Calendar.MONTH) + 1 < 10) {
                month = "0" + (cal.get(Calendar.MONTH) + 1);

            } else {
                month = "" + (cal.get(Calendar.MONTH) + 1);
            }

            String formatedDate = cal.get(Calendar.YEAR) + "/" + month;
            System.out.println(formatedDate);
            List<AttendanceBean> data = new ArrayList<AttendanceBean>();
            User user = userRepository.getOne(req.getUserCode());
            List<Attendance> attendanceList = attendanceRepository.findByUserANDDate(user, formatedDate);

            for (Attendance attendance : attendanceList) {
                AttendanceBean bean = new AttendanceBean();
                BeanUtils.copyProperties(attendance, bean);
                data.add(bean);
            }

            res.setData(data);
            res.setCode(EnumCodeResponse.SUCCESS.getCode());
            res.setMessage(EnumCodeResponse.SUCCESS.name());

        } catch (Exception e) {
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
            Site site = siteRepository.getOne(req.getSiteCode());
            Optional<User> userCode = userRepository.findByUserCode(req.getUserCode());
            Optional<Project> projectCode = projectRepository.findByProjectCode(req.getProjectCode());

            if (userCode.isPresent() && projectCode.isPresent()) {
                newAttendance.setUser(user);
                newAttendance.setDate(req.getDate());
                newAttendance.setProject(project);
                newAttendance.setTask(req.getTask());
                newAttendance.setSite(site);
                newAttendance.setTimeIn(req.getTimeIn());
                newAttendance.setTimeOut(req.getTimeOut());
                newAttendance = attendanceRepository.save(newAttendance);

            } else {
                throw new DataNotFoundException("Data not found, Method : insertAttendance");
            }

            res.setCode(EnumCodeResponse.SUCCESS.getCode());
            res.setMessage(EnumCodeResponse.SUCCESS.name());

        } catch (DataNotFoundException e) {
            res.setCode(e.getCode());
            res.setMessage(e.getMessage());
        } catch (Exception e) {
            res.setCode(EnumCodeResponse.FAIL.getCode());
            res.setMessage(e.getMessage());
        }

        return res;
    }

    public ResponseModel editAttendance(ReqEditAttendance req) {

        ResponseModel res = new ResponseModel();

        try {
            Optional<Attendance> newAttendance = attendanceRepository.findById(req.getId());
            Project project = projectRepository.getOne(req.getProjectCode());
            Site site = siteRepository.getOne(req.getSiteCode());

            if (newAttendance.isPresent()) {
                newAttendance.get().setDate(req.getDate());
                newAttendance.get().setTask(req.getTask());
                newAttendance.get().setProject(project);
                newAttendance.get().setSite(site);
                newAttendance.get().setTimeIn(req.getTimeIn());
                newAttendance.get().setTimeOut(req.getTimeOut());
                attendanceRepository.save(newAttendance.get());

            } else {
                throw new DataNotFoundException("Data not found, Method : editAttendance");
            }
            res.setCode(EnumCodeResponse.SUCCESS.getCode());
            res.setMessage(EnumCodeResponse.SUCCESS.name());

        } catch (DataNotFoundException e) {
            res.setCode(e.getCode());
            res.setMessage(e.getMessage());

        } catch (Exception e) {
            res.setCode(EnumCodeResponse.FAIL.getCode());
            res.setMessage(e.getMessage());

        }
        return res;

    }

    public ResponseModel deleteAttendance(ReqRemoveAttendance req) {

        ResponseModel res = new ResponseModel();

        try {
            Optional<Project> newProject = projectRepository.findByProjectCode(req.getProjectCode());
            Opt

            if (newProject.isPresent()) {

                projectRepository.delete(newProject.get());
            } else {
                throw new DataNotFoundException("Data not found, Method : removeCustomer");
            }

            res.setCode(EnumCodeResponse.SUCCESS.getCode());
            res.setMessage(EnumCodeResponse.SUCCESS.name());

        } catch (DataNotFoundException e) {
            res.setCode(e.getCode());
            res.setMessage(e.getMessage());

        } catch (Exception e) {
            res.setCode(EnumCodeResponse.FAIL.getCode());
            res.setMessage(e.getMessage());
        }
        return res;
    }

}