package com.project.time.sheet.repository;

import java.util.List;
import java.util.Optional;
import com.project.time.sheet.entity.User;
import com.project.time.sheet.entity.UserProfileMs;
import com.project.time.sheet.entity.UserProfileMsPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserProfileMsRepository extends JpaRepository<UserProfileMs, UserProfileMsPk> {

    @Query("SELECT n FROM UserProfileMs n WHERE n.id.user = ?1")
    Optional<UserProfileMs> findByUser(User user);

    List<UserProfileMs> findById_User(User user);

    @Query("SELECT e FROM UserProfileMs e WHERE e.firstName = ?1 and e.lastName = ?2")
    List<UserProfileMs> findByFirstNameAndLastName(String firstName, String lastName);

    @Query(value = "SELECT USER_PROFILE_MS.*  FROM USER_MS "
            + "INNER JOIN USER_PROFILE_MS ON USER_MS.USER_CODE = USER_PROFILE_MS.USER_CODE AND USER_MS.LINE_MANAGER = :lineManager "
            + "INNER JOIN ATTENDANCE ON USER_MS.USER_CODE = ATTENDANCE.USER_CODE AND ATTENDANCE.SITE_CODE = :siteCode "
            + "GROUP BY USER_PROFILE_MS.USER_CODE HAVING COUNT(USER_PROFILE_MS.USER_CODE) > 0 ", nativeQuery = true)
    List<UserProfileMs> findByAllStaff(@Param("lineManager") String lineManager, @Param("siteCode") String siteCode);
}