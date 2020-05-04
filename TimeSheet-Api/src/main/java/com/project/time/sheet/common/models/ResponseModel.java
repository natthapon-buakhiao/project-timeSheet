package com.project.time.sheet.common.models;

import java.io.Serializable;

import lombok.Data;

@Data
public class ResponseModel<T> {
	
	private String code;
	private String message;
	private T data;
	
}
