package com.project.time.sheet.common;

import lombok.Getter;

@Getter
public enum EnumCodeResponse {

	SUCCESS("00"), FAIL("99"),

	INTERNAL_SERVER("500"), BAD_REQUEST("400"), DATA_DUPLICATE("409"), DATA_NOT_FOUND("404"), FORBIDDEN("403"),
	Unauthorized("401"),

	NO_DATA("001");

	private String code;

	private EnumCodeResponse(String code) {
		this.code = code;
	}

}
