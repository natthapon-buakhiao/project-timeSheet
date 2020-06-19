package com.project.time.sheet.module.site.service;

import java.util.List;

import java.util.ArrayList;

import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.Site;
import com.project.time.sheet.repository.SiteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.time.sheet.common.EnumCodeResponse;

@Service
public class SiteService {
    @Autowired
    SiteRepository siteRepository;

    public ResponseModel<List<Site>> getAllSite() {
		ResponseModel<List<Site>> res = new ResponseModel<List<Site>>();
		try {
			List<Site> siteList = new ArrayList<Site>();
			siteList = siteRepository.findAll();
            res.setData(siteList);
            res.setCode(EnumCodeResponse.SUCCESS.getCode());
			res.setMessage(EnumCodeResponse.SUCCESS.name());
		}catch (Exception e) {
			res.setCode(EnumCodeResponse.FAIL.getCode());
			res.setMessage(e.getMessage());
		}
		return res;
    }
    
}