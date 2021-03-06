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

    // @Query("SELECT e FROM UserProject e WHERE e.id.user.userCode = ?1 and e.id.project.projectCode = ?2")
    List<UserProject> findById_UserAndId_Project(User user, Project project);

}