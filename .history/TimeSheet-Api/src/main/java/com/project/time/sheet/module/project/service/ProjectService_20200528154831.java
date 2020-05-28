package com.project.time.sheet.module.project.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.project.time.sheet.common.EnumCodeResponse;
import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.Project;
import com.project.time.sheet.entity.User;
import com.project.time.sheet.entity.UserProfileMs;
import com.project.time.sheet.exception.DataNotFoundException;
import com.project.time.sheet.module.project.models.ReqEditProject;
import com.project.time.sheet.module.project.models.ReqInquiryProject;
import com.project.time.sheet.module.project.models.ReqInsertProject;
import com.project.time.sheet.repository.ProjectRepository;
import com.project.time.sheet.repository.UserProfileMsRepository;
import com.project.time.sheet.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    UserProfileMsRepository userProfileMsRepository;

    @Autowired
    UserRepository userRepository;

    public ResponseModel<List<Project>> inquiryProject(ReqInquiryProject req) {
       
		ResponseModel<List<Project>> res = new ResponseModel<List<Project>>();
		try {
            List<Project> data = new ArrayList<Project>();
            Optional<Project> project = projectRepository.findByProjectCode(req.getProjectCode());
            if (project.isPresent()) {
                data.add(project.get());
                res.setData(data);
                res.setCode(EnumCodeResponse.SUCCESS.getCode());
                res.setMessage(EnumCodeResponse.SUCCESS.name());

            } else {
                throw new DataNotFoundException("Data not found, Method : inquiryUserProfile");
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

    public ResponseModel<List<Project>> getAllProject() {
		ResponseModel<List<Project>> res = new ResponseModel<List<Project>>();
		try {
			List<Project> projectList = new ArrayList<Project>();
			projectList = projectRepository.findAll();
			res.setCode(EnumCodeResponse.SUCCESS.getCode());
			res.setMessage(EnumCodeResponse.SUCCESS.name());
			res.setData(projectList);
		}catch (Exception e) {
			res.setCode(EnumCodeResponse.FAIL.getCode());
			res.setMessage(e.getMessage());
		}
		return res;
    }

    public ResponseModel insertProject(ReqInsertProject req) {

        ResponseModel res = new ResponseModel();

        try {
            Project newProject = new Project();
            Optional<User> userCode = userRepository.findByUserCode(req.getUserCodeSupervisor());
            List<Project> projectNameList = projectRepository.findAllProjectName(req.getProjectName());
            

            if(userCode.isPresent() && projectNameList.size() == 0 ){

                newProject.setProjectCode(req.getProjectCode());
                newProject.setProjectName(req.getProjectName());
                newProject.setDescription(req.getDescription());
                newProject.setUserCodeSupervisor(req.getUserCodeSupervisor());
                newProject.setDate(req.getDate());
                projectRepository.save(newProject);

                res.setCode(EnumCodeResponse.SUCCESS.getCode());
                res.setMessage(EnumCodeResponse.SUCCESS.name());

            } 
            else {
            throw new DataNotFoundException("Data not found, Method : insertProject");
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

    public ResponseModel editProject(ReqEditProject req) {

        ResponseModel res = new ResponseModel();

        try {
            Optional<User> userCode = userRepository.findByUserCode(req.getUserCodeSupervisor());
            Optional<Project> newProject = projectRepository.findByProjectCode(req.getProjectCode());

            if (newProject.isPresent() && userCode.get().getUserCode() == newProject.get().getUserCodeSupervisor()) {
                newProject.get().setProjectName(req.getProjectName());
                newProject.get().setDescription(req.getDescription());
                projectRepository.save(newProject.get());

            }
            else {
                throw new DataNotFoundException("Data not found, Method : editUserProfile");
            }
            res.setCode(EnumCodeResponse.SUCCESS.getCode());
			res.setMessage(EnumCodeResponse.SUCCESS.name());

        }catch (DataNotFoundException e){
            res.setCode(e.getCode());
            res.setMessage(e.getMessage());
            
        }catch (Exception e){
            res.setCode(EnumCodeResponse.FAIL.getCode());
            res.setMessage(e.getMessage());
            
        }
        return res;

    }
    
}