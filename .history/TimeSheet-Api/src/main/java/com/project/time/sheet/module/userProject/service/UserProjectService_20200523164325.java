package com.project.time.sheet.module.userProject.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.project.time.sheet.common.EnumCodeResponse;
import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.common.models.UserProjectBean;
import com.project.time.sheet.entity.Project;
import com.project.time.sheet.entity.UserProfileMs;
import com.project.time.sheet.entity.UserProject;
import com.project.time.sheet.entity.UserProjectPk;
import com.project.time.sheet.exception.DataNotFoundException;
import com.project.time.sheet.module.userProject.models.ReqInquiryUserProject;
import com.project.time.sheet.module.userProject.models.ReqInquiryUserProjectCode;
import com.project.time.sheet.module.userProject.models.ReqInsertUserProject;
import com.project.time.sheet.repository.ProjectRepository;
import com.project.time.sheet.repository.UserProfileMsRepository;
import com.project.time.sheet.repository.UserProjectRepository;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProjectService {

    @Autowired
    UserProjectRepository userProjectRepository;
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    UserProfileMsRepository userProfileMsRepository;

    public ResponseModel<List<UserProjectBean>> inquiryUserProject(ReqInquiryUserProject req) {
       
		ResponseModel<List<UserProjectBean>> res = new ResponseModel<List<UserProjectBean>>();
		try {
            List<UserProjectBean> data = new ArrayList<UserProjectBean>();
            UserProfileMs user = userProfileMsRepository.getOne(req.getUserCode());

            List<UserProject> userList = userProjectRepository.findById_UserCode(user);

            for(UserProject userProject : userList) {
                UserProjectBean bean = new UserProjectBean();
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

    // public ResponseModel<List<UserProjectBean>> inquiryUserProject(ReqInquiryUserProjectCode req) {
       
	// 	ResponseModel<List<UserProjectBean>> res = new ResponseModel<List<UserProjectBean>>();
	// 	try {
    //         List<UserProjectBean> data = new ArrayList<UserProjectBean>();
    //         Project project = projectRepository.getOne(req.getProjectCode());

    //         List<UserProject> userList = userProjectRepository.findById_ProjectCode(project);

    //         for(UserProject userProject : userList) {
    //             UserProjectBean bean = new UserProjectBean();
    //                 BeanUtils.copyProperties(userProject, bean);
    //                 data.add(bean);
	// 		}
	// 			res.setData(data);
    //             res.setCode(EnumCodeResponse.SUCCESS.getCode());
    //             res.setMessage(EnumCodeResponse.SUCCESS.name());


	// 	}catch (Exception e) {
	// 		res.setCode(EnumCodeResponse.FAIL.getCode());
	// 		res.setMessage(e.getMessage());
	// 	}
	// 	return res;
    // }



    public ResponseModel insertUserProject(ReqInsertUserProject req) {

        ResponseModel res = new ResponseModel();

        try {
            UserProject newUserProject = new UserProject();
            UserProjectPk id = new UserProjectPk();
                Project project = projectRepository.getOne(req.getProjectCode());
                UserProfileMs user = userProfileMsRepository.getOne(req.getUserCode());

                id.setUserCode(user);
                id.setProjectCode(project);
                newUserProject.setId(id);
                newUserProject.setTask(req.getTask());
                newUserProject.setDate(req.getDate());
                
                userProjectRepository.save(newUserProject);
                res.setCode(EnumCodeResponse.SUCCESS.getCode());
                res.setMessage(EnumCodeResponse.SUCCESS.name());

     }catch (DataNotFoundException e){
        res.setCode(e.getCode());
        res.setMessage(e.getMessage());
    } catch (Exception e) {
            res.setCode(EnumCodeResponse.FAIL.getCode());
            res.setMessage(e.getMessage());
        }
        return res;
    }
    

}