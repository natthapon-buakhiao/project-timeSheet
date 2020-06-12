package com.project.time.sheet.repository;

import java.util.List;
import java.util.Optional;

import com.project.time.sheet.entity.User;
import com.project.time.sheet.entity.UserProfileMs;
import com.project.time.sheet.entity.UserProfileMsPk;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserProfileMsRepository extends JpaRepository<UserProfileMs, UserProfileMsPk> {

    @Query( "SELECT n FROM UserProfileMs n WHERE n.id.user = ?1")
    Optional<UserProfileMs> findByUser(User user);

    // @Query( "SELECT n FROM UserProfileMs n WHERE n.user = ?1")
    // List<UserProfileMs> findAllUserCode(User user);

    List<UserProfileMs> findById_User(User user);

    // @Query("SELECT e FROM UserProfileMs e WHERE e.firstName = ?1 and e.lastName = ?2")
    // List<UserProfileMs> findByFnameAndLname(String firstName, String lastName);
    
    // @Query( "SELECT n FROM UserProfileMs n WHERE n.user.lineManager = ?1")
    // List<UserProfileMs> findAllUserLineManager(String lineManager);
}