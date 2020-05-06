package com.project.time.sheet.module.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.Login;
import com.project.time.sheet.repository.LoginRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class LoginController {
	
	@Autowired
    private LoginRepository loginRepository;

    @GetMapping(path = "/Login/{userCode}/{password}")
    private ResponseEntity<Login> login(@PathVariable String userCode, @PathVariable String password) {
        Login l = loginRepository.findByUserCodeAndPassword(userCode,password);
       if(l == null){
           return ResponseEntity.notFound().build();
       }
       return ResponseEntity.ok().body(l);
    }

      //Login
      @PostMapping(path = "/login/{userId}")
      private Login login(@PathVariable long loginId){
        Login l = loginRepository.findById(loginId);
  
          l.setLogin(true);
          return loginRepository.save(l);
      }
}
