package com.project.time.sheet.module.user.controller;

import java.util.List;
import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.User;
import com.project.time.sheet.module.user.models.ReqInquiryUser;
import com.project.time.sheet.module.user.models.ReqInsertUser;
import com.project.time.sheet.module.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping(value = "/insert")
    public ResponseEntity<ResponseModel> insertUser(@RequestBody ReqInsertUser req) {

        ResponseModel res = new ResponseModel();
        res = userService.insertUser(req);
        return ResponseEntity.ok(res);
    }

    @GetMapping(value = "/get")
    public ResponseEntity<ResponseModel<List<User>>> getAll() {

        ResponseModel<List<User>> res = new ResponseModel<List<User>>();
        res = userService.getAllUser();
        return ResponseEntity.ok(res);
    }

    @PostMapping(value = "/inquiry")
    public ResponseEntity<ResponseModel<List<User>>> inquiry(@RequestBody ReqInquiryUser req) {

        ResponseModel<List<User>> res = new ResponseModel<List<User>>();
        res = userService.inquiryUser(req);
        return ResponseEntity.ok(res);
    }

}