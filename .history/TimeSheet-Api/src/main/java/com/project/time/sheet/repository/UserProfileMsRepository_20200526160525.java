package com.project.time.sheet.repository;

import java.util.List;
import java.util.Optional;

import com.project.time.sheet.entity.User;
import com.project.time.sheet.entity.UserProfileMs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserProfileMsRepository extends JpaRepository<UserProfileMs, String> {

    @Query( "SELECT n FROM UserProfileMs n WHERE n.user = ?1")
    Optional<UserProfileMs> findByUser(User user);

    @Query( "SELECT n FROM UserProfileMs n WHERE n.user = ?1")
    List<UserProfileMs> findAllUserCode(User user);

    @Query("SELECT e FROM Student e WHERE e.fname = ?1 and e.lname = ?2")
    List<Student> findByFnameAndLname(String fname, String lname);
}