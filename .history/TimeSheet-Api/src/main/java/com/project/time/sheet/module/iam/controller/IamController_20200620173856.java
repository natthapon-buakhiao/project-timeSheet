package com.project.time.sheet.module.iam.controller;

import com.project.time.sheet.module.iam.models.ReqAuthentication;
import com.project.time.sheet.module.iam.models.ReqProfile;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/iam")
public class IamController {

    @Value("${api.IAM}")
    private String api;

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public String Authen(@RequestBody final ReqAuthentication req) {
        final RestTemplate restTemplate = new RestTemplate();
        final HttpEntity<ReqAuthentication> entity = new HttpEntity<ReqAuthentication>(req);
        return restTemplate
                .exchange(api + "auth/sign-in", HttpMethod.POST, entity, String.class)
                .getBody();
    }

    @PostMapping(value = "/inquiryProfile", produces = MediaType.APPLICATION_JSON_VALUE)
    public String inquiryProfile(@RequestBody final ReqProfile req) {
        final RestTemplate restTemplate = new RestTemplate();
        final HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + req.getToken());
        final HttpEntity<String> entity = new HttpEntity<String>(headers);
        return restTemplate
                .exchange(api + "api/user/me", HttpMethod.GET, entity, String.class)
                .getBody();

    }
}