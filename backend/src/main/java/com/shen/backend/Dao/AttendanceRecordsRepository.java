package com.shen.backend.Dao;

import org.springframework.stereotype.Repository;
import com.shen.backend.Model.AttendanceRecords;
import com.shen.backend.Model.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Date;

@Repository
public interface AttendanceRecordsRepository extends JpaRepository<AttendanceRecords, Long> {
    List<AttendanceRecords> findByEmployee(Employees employee);

    @Query("SELECT a FROM AttendanceRecords a WHERE a.employee = :employee AND a.timestamp >= :startOfDay AND a.timestamp < :endOfDay ORDER BY a.timestamp DESC")
    List<AttendanceRecords> findByEmployeeAndDate(@Param("employee") Employees employee,
            @Param("startOfDay") Date startOfDay, @Param("endOfDay") Date endOfDay);

    @Query("SELECT a FROM AttendanceRecords a WHERE a.employee = :employee ORDER BY a.timestamp DESC")
    List<AttendanceRecords> findByEmployeeOrderByTimestampDesc(@Param("employee") Employees employee);
}