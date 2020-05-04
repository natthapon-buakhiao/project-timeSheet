package com.project.time.sheet.common.models;

import java.util.List;

import lombok.Data;

@Data
public class RepoinseModelListTimeSheet<T> {

	private String code;
	private String message;
	private List<T> data;
}
