package com.project.time.sheet;

import java.time.LocalTime;
import java.util.Date;

import com.project.time.sheet.entity.Attendance;
import com.project.time.sheet.entity.Project;
import com.project.time.sheet.entity.Site;
import com.project.time.sheet.repository.AttendanceRepository;
import com.project.time.sheet.repository.ProjectRepository;
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
			// s1.setUserCodeSupervisor("Sup001");
			siteRepository.save(s1);	

			Site s2 = new Site();
			s2.setSiteCode("KTB001");
			s2.setSite("ธนาคารกรุงไทย");
			// s2.setUserCodeSupervisor("Sup001");
			siteRepository.save(s2);	


			// Project p1 = new Project();
			// Long l1 = new Long(1);
			// Date d1 = new Date();
			// p1.setId(l1);
			// p1.setProjectName("A");
			// p1.setDescription("Backend");
			// p1.setUserCodeSupervisor("admin09");
			// p1.setUserCodeEmployee("employee_1");
			// p1.setDate(d1);
			// projectRepository.save(p1);



		};
	}

}
