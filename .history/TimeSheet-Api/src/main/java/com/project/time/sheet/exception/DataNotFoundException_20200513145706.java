package com.project.time.sheet.exception;

public class DataNotFoundException extends RuntimeException{

    String code;
	String message;
	
	public DataNotFoundException(String message){
		this.code = EnumCodeResponse.DATA_NOT_FOUND.getCode();
		this.message = message;
	}
	
	public DataNotFoundException(String code,String message){
		this.code = code ;
		this.message = message ;
	}
	
    
}