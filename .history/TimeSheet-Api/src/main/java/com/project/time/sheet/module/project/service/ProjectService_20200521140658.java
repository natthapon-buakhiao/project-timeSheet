package com.project.time.sheet.module.project.service;

import java.util.List;
import java.util.Optional;

import com.project.time.sheet.common.EnumCodeResponse;
import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.Project;
import com.project.time.sheet.entity.UserProfileMs;
import com.project.time.sheet.exception.DataNotFoundException;
import com.project.time.sheet.module.project.models.ReqInsertProject;
import com.project.time.sheet.repository.ProjectRepository;
import com.project.time.sheet.repository.UserProfileMsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    UserProfileMsRepository userProfileMsRepository;

    public ResponseModel insertProject(ReqInsertProject req) {

        ResponseModel res = new ResponseModel();

        try {
            Project newProject = new Project();
            Optional<UserProfileMs> userSup = userProfileMsRepository.findAllUserCode(req.getUserCodeSupervisor());
            

            ifuserSup.isPresent()){

                newProject.setProjectName(req.getProjectName());
                newProject.setDescription(req.getDescription());
                newProject.setUserCodeEmployee(req.getUserCodeEmployee());
                newProject.setUserCodeSupervisor(req.getUserCodeSupervisor());
                newProject.setDate(req.getDate());
                projectRepository.save(newProject);

                res.setCode(EnumCodeResponse.SUCCESS.getCode());
                res.setMessage(EnumCodeResponse.SUCCESS.name());

            } 
            else {
            throw new DataNotFoundException("Data not found, Method : insertProject");
        }
          res.setCode(EnumCodeResponse.SUCCESS.getCode());
                res.setMessage(EnumCodeResponse.SUCCESS.name());

        } catch (Exception e) {
            res.setCode(EnumCodeResponse.FAIL.getCode());
			res.setMessage(e.getMessage());
        }
        return res;
        
    }
    
}