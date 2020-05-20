package com.project.time.sheet;

import java.time.LocalTime;
import java.util.Date;

import com.project.time.sheet.entity.Attendance;
import com.project.time.sheet.entity.Project;
import com.project.time.sheet.repository.AttendanceRepository;
import com.project.time.sheet.repository.ProjectRepository;

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
	ApplicationRunner init( AttendanceRepository attendanceRepository, ProjectRepository projectRepository) {
		return args -> {
			
			Project p1 = new Project();
			Long l1 = new Long(1);
			Date d1 = new Da
			p1.setId(l1);
			p1.setProjectName("A");
			p1.setDescription("Backend");
			p1.setUserCodeSupervisor("admin09");
			p1.setUserCodeEmployee("employee_1");
			projectRepository.save(p1);

			Project p2 = new Project();
			Long l2 = new Long(2);
			p2.setId(l2);
			p2.setProjectName("B");
			p2.setDescription("Forntend");
			p2.setUserCodeSupervisor("admin09");
			p2.setUserCodeEmployee("employee_1");
			projectRepository.save(p2);

			Project p3 = new Project();
			Long l3 = new Long(3);
			p3.setId(l3);
			p3.setProjectName("A");
			p3.setDescription("Forntend");
			p3.setUserCodeSupervisor("admin09");
			p3.setUserCodeEmployee("employee_2");
			projectRepository.save(p3);



		};
	}

}
