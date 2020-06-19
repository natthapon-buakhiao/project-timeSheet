package com.project.time.sheet.common.models;

import lombok.Data;

@Data
public class ResponseModel<T> {

	private String code;
	private String message;
	private T data;

}
