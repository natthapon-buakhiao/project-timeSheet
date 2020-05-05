package com.project.time.sheet;

import java.time.LocalTime;
import java.util.Date;

import com.project.time.sheet.entity.Attendance;
import com.project.time.sheet.repository.AttendanceRepository;

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
	ApplicationRunner init( AttendanceRepository attendanceRepository) {
		return args -> {

			Attendance a1 = new Attendance();
			Long l1 = new Long(1);
			LocalTime timeIn = LocalTime.now();
			LocalTime timeOut = LocalTime.now();
			Date date = new Date();

			


			// History h1 = new History();
			// Long l1 = new Long(1);
			// LocalTime timeIn = LocalTime.now();
			// LocalTime timeOut = LocalTime.now();
			// Date date = new Date();

			// h1.setSignId(l1);
			// h1.setFirstName("Natthapon");
			// h1.setLastName("Buakhiao");
			// h1.setPosition("Employee");
			// h1.setTask("backend");
			// h1.setProject("time sheet");
			// h1.setTimeIn(timeIn);
			// h1.setTimeOut(timeOut);
			// h1.setDate(date);

			// historyRepository.save(h1);





		};
	}

}
