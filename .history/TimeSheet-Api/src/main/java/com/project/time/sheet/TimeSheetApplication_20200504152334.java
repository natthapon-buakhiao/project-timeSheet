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

	public static void main(final String[] args) {
		SpringApplication.run(TimeSheetApplication.class, args);
	}

	@Bean
	ApplicationRunner init( final AttendanceRepository attendanceRepository, final ProjectRepository projectRepository) {
		return args -> {

			final Attendance a1 = new Attendance();
			final Long l1 = new Long(123);
			final LocalTime timeIn = LocalTime.now();
			final LocalTime timeOut = LocalTime.now();
			final Date date = new Date();

			a1.setId(l1);
			a1.setUserId("123aa");
			a1.setTask("backend");
			a1.setTimeIn(timeIn);
			a1.setTimeOut(timeOut);
			a1.setDate(date);
			attendanceRepository.save(a1);

			final Project p1 = new Project();
			final Long l2 = new Long(2);
			p1.setId(l2);
			p1.setProjectName("A");
			p1.setDescription("Backend");
			p1.setUserId(a1.getId());
			projectRepository.save(p1);



		};
	}

}
