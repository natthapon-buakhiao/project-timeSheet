package com.project.time.sheet.module.iam.controller;

import java.util.Arrays;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/iam")
public class IamController {

    @PostMapping(value = "/login")
    public String Authen(@RequestBody final ReqAuthentication req) {
        final RestTemplate restTemplate = new RestTemplate();
        final HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        final HttpEntity<ReqAuthentication> entity = new HttpEntity<ReqAuthentication>(req, headers);
        return restTemplate
                .exchange("https://dev.priorsolution.co.th/iam/v2/auth/sign-in", HttpMethod.POST, entity, String.class)
                .getBody();
    }

    @RequestMapping(value = "/inquiryProfile", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public String inquiryProfile(@RequestBody final ReqProfile req) {
        final RestTemplate restTemplate = new RestTemplate();
        final HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + req.getToken());
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        final HttpEntity<String> entity = new HttpEntity<String>(headers);
        return restTemplate
                .exchange("https://dev.priorsolution.co.th/iam/v2/api/user/me", HttpMethod.GET, entity, String.class)
                .getBody();

    }
}