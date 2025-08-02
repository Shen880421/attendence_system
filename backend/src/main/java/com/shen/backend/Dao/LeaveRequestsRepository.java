package com.shen.backend.Dao;

import org.springframework.stereotype.Repository;
import com.shen.backend.Model.LeaveRequests;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface LeaveRequestsRepository extends JpaRepository<LeaveRequests, Long> {
    // Additional query methods can be defined here if needed
}