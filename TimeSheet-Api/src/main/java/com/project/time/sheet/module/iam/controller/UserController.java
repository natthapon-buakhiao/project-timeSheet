package com.project.time.sheet.module.iam.controller;

import java.util.Arrays;

import com.project.time.sheet.module.iam.models.ReqProfile;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "/iam")
public class UserController {

    @RequestMapping(value  = "/profile", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public String getProfile(@RequestBody final ReqProfile req){
        final RestTemplate restTemplate = new RestTemplate();
        final HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + req.getToken()
        );
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        final HttpEntity <String> entity = new HttpEntity<String>(headers);
        System.out.println(restTemplate.exchange("https://dev.priorsolution.co.th/iam/v2/api/user/me", HttpMethod.GET, entity, String.class).getBody());
        return restTemplate.exchange("https://dev.priorsolution.co.th/iam/v2/api/user/me", HttpMethod.GET, entity, String.class).getBody();
        

    }
    
}