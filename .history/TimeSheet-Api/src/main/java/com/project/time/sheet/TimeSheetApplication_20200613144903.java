package com.project.time.sheet;


import com.project.time.sheet.entity.Site;
import com.project.time.sheet.repository.SiteRepository;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TimeSheetApplication {

	public static void main(String[] args) {
		SpringApplication.run(TimeSheetApplication.class, args);
	}

	@Bean
	ApplicationRunner init(SiteRepository siteRepository) {
		return args -> {
			
			Site s1 = new Site();
			s1.setSiteCode("BAY001");
			s1.setSite("ธนาคารกรุงศรี");
			siteRepository.save(s1);	

			Site s2 = new Site();
			s2.setSiteCode("KTB001");
			s2.setSite("ธนาคารกรุงไทย");
			siteRepository.save(s2);	




		};
	}

}
