package com.project.time.sheet.entity;

import java.io.Serializable;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Embeddable
public class UserProjectPk implements Serializable {

    private static final long serialVersionUID = 1L;
	


	@ManyToOne
	@JoinColumn(name = "USER_CODE")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private User user;

	@ManyToOne
	@JoinColumn(name = "PROJECT_CODE")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Project project;

    
}