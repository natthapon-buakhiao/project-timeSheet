package com.project.time.sheet.repository;

import com.project.time.sheet.entity.Project;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, String> {

    // @Query(value = "SELECT * FROM COOP_DB.COOP_TR_TRANSACTION WHERE CUSTOMER_NO = ?1 AND ACCOUNT_NO = ?2 ORDER BY TRANSACTION_ID",nativeQuery = true)
    // List<CoopTrTransaction> findByCustomerNoAndAccountNoAndOrderId(String customerNo, String accountNo);
    @Query(value = "SELECT * FROM COOP_DB.COOP_TR_TRANSACTION WHERE CUSTOMER_NO = ?1 AND ACCOUNT_NO = ?2 ORDER BY TRANSACTION_ID",nativeQuery = true)
	List<CoopTrTransaction> findByCustomerNoAndAccountNoAndOrderId(String customerNo, String accountNo);
    
}