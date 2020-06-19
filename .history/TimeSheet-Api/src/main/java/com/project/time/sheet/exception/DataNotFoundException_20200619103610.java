package com.project.time.sheet.exception;

import com.project.time.sheet.common.EnumCodeResponse;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class DataNotFoundException extends RuntimeException {

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