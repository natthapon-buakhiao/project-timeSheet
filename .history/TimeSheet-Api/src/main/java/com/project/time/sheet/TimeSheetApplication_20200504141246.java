package com.project.time.sheet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TimeSheetApplication {

	public static void main(String[] args) {
		SpringApplication.run(TimeSheetApplication.class, args);
	}

	@Bean
	ApplicationRunner init(NameTitleRepository nameTitleRepositorty,LoginRepository loginRepository
	,HistoryRepository historyRepository,ProjectRepository projectRepository) {
		return args -> {


			Stream.of("admin09").forEach(userCode -> {
				Login login = new Login();	
				
				login.setLogin(false);
				login.setUserCode(userCode);
				login.setPassword("password");
	
				loginRepository.save(login);
	
			});

			History h1 = new History();
			Long l1 = new Long(1);
			LocalTime timeIn = LocalTime.now();
			LocalTime timeOut = LocalTime.now();
			Date date = new Date();

			h1.setSignId(l1);
			h1.setFirstName("Natthapon");
			h1.setLastName("Buakhiao");
			h1.setPosition("Employee");
			h1.setTask("backend");
			h1.setProject("time sheet");
			h1.setTimeIn(timeIn);
			h1.setTimeOut(timeOut);
			h1.setDate(date);

			historyRepository.save(h1);



			Project p1 = new Project();
			Project p2 = new Project();
			Project p3 = new Project();
			
			p1.setNameProject("PROJECT A");
			p2.setNameProject("PROJECT B");
			p3.setNameProject("PROJECT C");

			projectRepository.save(p1);
			projectRepository.save(p2);
			projectRepository.save(p3);



		};
	}

}
