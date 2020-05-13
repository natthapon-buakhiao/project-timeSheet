package com.project.time.sheet.module.profile.controller;

import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.module.profile.models.ReqInsertProfile;
import com.project.time.sheet.module.profile.service.ProfileService;

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
@RequestMapping(path = "/profile")
public class UserProfileController {
    @Autowired
    ProfileService profileService;
    
            @RequestMapping(value = "/insert", method = RequestMethod.POST)
			public ResponseEntity<ResponseModel> insert(@RequestBody ReqInsertProfile req){
				
				ResponseModel res = new ResponseModel();
				
                res = profileService.insertProfile(req);
				
				return ResponseEntity.ok(res);
            }
            @RequestMapping(value = "/edit", method = RequestMethod.POST)
			public ResponseEntity<ResponseModel> edit(@RequestBody ReqEditProduct req){
				
				ResponseModel res = new ResponseModel();
				
				res = productService.editProduct(req);
				
				return ResponseEntity.ok(res);
			}
    
}