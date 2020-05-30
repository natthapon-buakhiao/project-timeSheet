package com.project.time.sheet.common.models;

import lombok.Data;

@Data
public class UserProfileMsBean {

    private Long id;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;
    
}