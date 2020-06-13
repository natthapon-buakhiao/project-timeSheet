package com.project.time.sheet.module.report.service;

import com.project.time.sheet.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {
    @Autowired
    UserRepository userRepository;
    

    public ResponseModel<List<UserProfileMsBean>> inquiryUserProfileStaff(ReqListProfile req) {
       
		ResponseModel<List<UserProfileMsBean>> res = new ResponseModel<List<UserProfileMsBean>>();
		try {
            List<UserProfileMsBean> data = new ArrayList<UserProfileMsBean>();
            List<UserProfileMs> userList = userProfileMsRepository.findByAllStaff(req.getLineManager(),req.getSiteCode());

            for(UserProfileMs userProfile : userList) {
                UserProfileMsBean bean = new UserProfileMsBean();
                    BeanUtils.copyProperties(userProfile, bean);
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