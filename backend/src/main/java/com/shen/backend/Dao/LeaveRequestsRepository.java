package com.shen.backend.Dao;

import org.springframework.stereotype.Repository;
import com.shen.backend.Model.LeaveRequests;
import com.shen.backend.Model.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

@Repository
public interface LeaveRequestsRepository extends JpaRepository<LeaveRequests, Long> {
    List<LeaveRequests> findByEmployee(Employees employee);
}