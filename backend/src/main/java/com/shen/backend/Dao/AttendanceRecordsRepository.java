package com.shen.backend.Dao;

import org.springframework.stereotype.Repository;
import com.shen.backend.Model.AttendanceRecords;
import com.shen.backend.Model.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

@Repository
public interface AttendanceRecordsRepository extends JpaRepository<AttendanceRecords, Long> {
    List<AttendanceRecords> findByEmployee(Employees employee);
}
