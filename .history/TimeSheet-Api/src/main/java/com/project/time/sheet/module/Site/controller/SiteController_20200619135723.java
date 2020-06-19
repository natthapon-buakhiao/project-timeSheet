package com.project.time.sheet.module.site.controller;

import java.util.List;
import com.project.time.sheet.common.models.ResponseModel;
import com.project.time.sheet.entity.Site;
import com.project.time.sheet.module.site.service.SiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/site")
public class SiteController {
	@Autowired
	SiteService siteService;

	@RequestMapping(value = "/getdata", method = RequestMethod.GET)
	@GetMapping(value = "/getdata")
	public ResponseEntity<ResponseModel<List<Site>>> getAll() {

		ResponseModel<List<Site>> res = new ResponseModel<List<Site>>();
		res = siteService.getAllSite();
		return ResponseEntity.ok(res);
	}

}