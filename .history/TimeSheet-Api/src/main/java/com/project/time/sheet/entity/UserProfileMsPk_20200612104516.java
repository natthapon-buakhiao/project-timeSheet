package com.project.time.sheet.entity;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.OneToOne;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Embeddable
public class UserProfileMsPk implements Serializable {
    private static final long serialVersionUID = 1L;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "USER_CODE", referencedColumnName = "USER_CODE")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;
    
}