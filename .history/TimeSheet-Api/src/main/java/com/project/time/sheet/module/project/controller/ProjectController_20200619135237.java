package com.project.time.sheet.module.project.controller;

import java.util.List;
import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.Project;
import com.project.time.sheet.module.project.models.ReqEditProject;
import com.project.time.sheet.module.project.models.ReqInquiryProject;
import com.project.time.sheet.module.project.models.ReqInsertProject;
import com.project.time.sheet.module.project.models.ReqRemoveProject;
import com.project.time.sheet.module.project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/project")
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @PostMapping(value = "/insert")
    public ResponseEntity<ResponseModel> insert(@RequestBody ReqInsertProject req) {

        ResponseModel res = new ResponseModel();
        res = projectService.insertProject(req);
        return ResponseEntity.ok(res);
    }

    @RequestMapping(value = "/inquiry", method = RequestMethod.POST)
    @PostMapping(value = "/insert")
    public ResponseEntity<ResponseModel<List<Project>>> inquiryProject(@RequestBody ReqInquiryProject req) {
        ResponseModel<List<Project>> res = new ResponseModel<List<Project>>();
        res = projectService.inquiryProject(req);
        return ResponseEntity.ok(res);
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public ResponseEntity<ResponseModel> edit(@RequestBody ReqEditProject req) {

        ResponseModel res = new ResponseModel();
        res = projectService.editProject(req);
        return ResponseEntity.ok(res);
    }

    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    public ResponseEntity<ResponseModel> remove(@RequestBody ReqRemoveProject req) {

        ResponseModel res = new ResponseModel();
        res = projectService.deleteProject(req);
        return ResponseEntity.ok(res);
    }

}