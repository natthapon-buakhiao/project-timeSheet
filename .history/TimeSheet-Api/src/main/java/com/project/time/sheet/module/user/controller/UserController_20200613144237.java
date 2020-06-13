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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public ResponseEntity<ResponseModel> insertUser(@RequestBody ReqInsertUser req){
        
        ResponseModel res = new ResponseModel();
        
        res = userService.insertUser(req);
        
        return ResponseEntity.ok(res);
    }

    @RequestMapping(value = "/getdata", method = RequestMethod.GET)
	public ResponseEntity<ResponseModel<List<User>>> getAll(){
        ResponseModel<List<User>> res = new ResponseModel<List<User>>();
        res = userService.getAllUser();
        return ResponseEntity.ok(res);
    }

    @RequestMapping(value = "/inquiry", method = RequestMethod.POST)
    public ResponseEntity<ResponseModel<List<User>>> inquiry(@RequestBody ReqInquiryUser req){
        ResponseModel<List<User>> res = new ResponseModel<List<User>>();
        res = userService.inquiryUser(req);
        return ResponseEntity.ok(res);
    }
            
    
}