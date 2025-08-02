package com.shen.backend.Dao;

import org.springframework.stereotype.Repository;

import com.shen.backend.Model.AttendanceRecords;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface AttendanceRecordsRepository extends JpaRepository<AttendanceRecords, Long> {
}
