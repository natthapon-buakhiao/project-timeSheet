package com.project.time.sheet.module.report.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.project.time.sheet.common.EnumCodeResponse;
import com.project.time.sheet.common.models.ReportBean;
import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.Report;
import com.project.time.sheet.exception.DataNotFoundException;
import com.project.time.sheet.module.report.models.ReqInquiryReport;
import com.project.time.sheet.module.report.models.ReqInsertReport;
import com.project.time.sheet.repository.ReportRepository;
import com.project.time.sheet.repository.UserRepository;
import com.project.time.sheet.entity.User;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ReportRepository reportRepository;
    
    public ResponseModel<List<ReportBean>> inquiryReport(ReqInquiryReport req) {
       
		ResponseModel<List<ReportBean>> res = new ResponseModel<List<ReportBean>>();
		try {
            List<ReportBean> data = new ArrayList<ReportBean>();
            User user = userRepository.getOne(req.getUserCode());
            List<Report> reportList = reportRepository.findByReportUserList(user);

            for(Report report : attendanceList) {
                ReportBean bean = new ReportBean();
                    BeanUtils.copyProperties(report, bean);
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
                newReport.setTotalHours(req.getTotalHours());
                newReport.setTask(req.getTask());
                newReport.setFeedBack(req.getFeedBack());
                newReport.setGoal(req.getGoal());

                newReport = reportRepository.save(newReport);
                

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