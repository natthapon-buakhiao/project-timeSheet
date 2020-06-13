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

            for(Report report : reportList) {
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

    
}