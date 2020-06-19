package com.project.time.sheet.repository;

import com.project.time.sheet.entity.Site;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteRepository extends JpaRepository<Site, String> {
    
}