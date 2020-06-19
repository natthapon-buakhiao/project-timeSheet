package com.project.time.sheet.repository;

import java.util.List;

import com.project.time.sheet.entity.Project;
import com.project.time.sheet.entity.User;
import com.project.time.sheet.entity.UserProject;
import com.project.time.sheet.entity.UserProjectPk;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProjectRepository extends JpaRepository<UserProject, UserProjectPk> {

    List<UserProject> findById_User(User user);

    List<UserProject> findById_Project(Project project);

    List<UserProject> findByUserCodeANDProjectCode(String userCode, String projectCode);

}