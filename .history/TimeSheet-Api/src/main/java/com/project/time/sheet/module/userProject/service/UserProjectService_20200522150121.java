package com.project.time.sheet.module.userProject.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.project.time.sheet.common.EnumCodeResponse;
import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.Project;
import com.project.time.sheet.entity.UserProfileMs;
import com.project.time.sheet.entity.UserProject;
import com.project.time.sheet.entity.UserProjectPk;
import com.project.time.sheet.exception.DataNotFoundException;
import com.project.time.sheet.module.userProject.models.ReqInquiryUserProject;
import com.project.time.sheet.module.userProject.models.ReqInsertUserProject;
import com.project.time.sheet.repository.ProjectRepository;
import com.project.time.sheet.repository.UserProfileMsRepository;
import com.project.time.sheet.repository.UserProjectRepository;

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

    public ResponseModel<List<UserProject>> inquiryUserProject(ReqInquiryUserProject req) {
       
		ResponseModel<List<UserProject>> res = new ResponseModel<List<UserProject>>();
		try {
            List<UserProject> data = new ArrayList<UserProject>();
			List<UserProject> userList = userProjectRepository.findAllUserCode(req.getUserCode());
            // if (attendanceList.isEmpty()) {
					data.addAll(userList);
				// }
				res.setData(data);
                res.setCode(EnumCodeResponse.SUCCESS.getCode());
                res.setMessage(EnumCodeResponse.SUCCESS.name());

            // } else {
            //     throw new DataNotFoundException("Data not found, Method : inquiryAttendance");
            // }
		}catch (Exception e) {
			res.setCode(EnumCodeResponse.FAIL.getCode());
			res.setMessage(e.getMessage());
		}
		return res;
    }

    public ResponseModel<List<UserProject>> inquiryUserProjectId(ReqInquiryUserProjectId req) {
       
		ResponseModel<List<UserProject>> res = new ResponseModel<List<UserProject>>();
		try {
            List<UserProject> data = new ArrayList<UserProject>();
			List<UserProject> userList = userProjectRepository.findAllUserCode(req.getUserCode());
            // if (attendanceList.isEmpty()) {
					data.addAll(userList);
				// }
				res.setData(data);
                res.setCode(EnumCodeResponse.SUCCESS.getCode());
                res.setMessage(EnumCodeResponse.SUCCESS.name());

            // } else {
            //     throw new DataNotFoundException("Data not found, Method : inquiryAttendance");
            // }
		}catch (Exception e) {
			res.setCode(EnumCodeResponse.FAIL.getCode());
			res.setMessage(e.getMessage());
		}
		return res;
    }


    public ResponseModel insertUserProject(ReqInsertUserProject req) {

        ResponseModel res = new ResponseModel();

        try {
            UserProject newUserProject = new UserProject();
            UserProjectPk id = new UserProjectPk();

            Optional<UserProfileMs> user = userProfileMsRepository.findAllUserCode(req.getUserCode());
            Optional<Project> project = projectRepository.findByProjectCode(req.getProjectCode());

            if(user.isPresent() && project.isPresent()){
                id.setUserCode(user.get().getUserCode());
                id.setProjectCode(project.get().getProjectCode());
                newUserProject.setId(id);
                newUserProject.setTask(req.getTask());
                newUserProject.setDate(req.getDate());
                
                userProjectRepository.save(newUserProject);
                res.setCode(EnumCodeResponse.SUCCESS.getCode());
                res.setMessage(EnumCodeResponse.SUCCESS.name());

            } else {
            throw new DataNotFoundException("Data not found, Method : insertUserProject");
        }
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