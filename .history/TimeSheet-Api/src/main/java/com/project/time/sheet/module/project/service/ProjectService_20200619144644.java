package com.project.time.sheet.module.project.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.project.time.sheet.common.EnumCodeResponse;
import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.Project;
import com.project.time.sheet.entity.User;
import com.project.time.sheet.exception.DataNotFoundException;
import com.project.time.sheet.module.project.models.ReqEditProject;
import com.project.time.sheet.module.project.models.ReqInquiryProject;
import com.project.time.sheet.module.project.models.ReqInsertProject;
import com.project.time.sheet.module.project.models.ReqRemoveProject;
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
            List<Project> project = projectRepository.findByUserCodeSupervisor(req.getUserCodeSupervisor());

            if (!(project.isEmpty())) {
                data.addAll(project);
                res.setData(data);

            } else {
                throw new DataNotFoundException("Data not found, Method : inquiryUserProfile");
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

    public ResponseModel insertProject(ReqInsertProject req) {

        ResponseModel res = new ResponseModel();

        try {
            Project newProject = new Project();
            Optional<User> userCode = userRepository.findByUserCode(req.getUserCodeSupervisor());
            List<Project> projectNameList = projectRepository.findAllProjectName(req.getProjectName());
            List<Project> projectList = projectRepository.findAllProject(req.getProjectCode());

            if (!(userCode.isPresent())) {
                throw new DataNotFoundException("Data not found, Method : insertProject");

            } else if (projectNameList.size() == 0 && projectList.size() == 0) {

                newProject.setProjectCode(req.getProjectCode());
                newProject.setProjectName(req.getProjectName());
                newProject.setDescription(req.getDescription());
                newProject.setUserCodeSupervisor(req.getUserCodeSupervisor());
                newProject.setDate(req.getDate());
                projectRepository.save(newProject);

                res.setCode(EnumCodeResponse.SUCCESS.getCode());
                res.setMessage(EnumCodeResponse.SUCCESS.name());

            } else {
                res.setCode(EnumCodeResponse.DATA_DUPLICATE.getCode());
                res.setMessage(EnumCodeResponse.DATA_DUPLICATE.name());
            }

        } catch (DataNotFoundException e) {
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
            Optional<Project> newProject = projectRepository.findByProjectCode(req.getProjectCode());

            if (newProject.isPresent()) {
                newProject.get().setProjectName(req.getProjectName());
                newProject.get().setDescription(req.getDescription());
                projectRepository.save(newProject.get());

            } else {
                throw new DataNotFoundException("Data not found, Method : editUserProfile");
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

    public ResponseModel deleteProject(ReqRemoveProject req) {

        ResponseModel res = new ResponseModel();

        try {
            Optional<Project> newProject = projectRepository.findByProjectCode(req.getProjectCode());

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