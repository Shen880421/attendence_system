package com.shen.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shen.backend.Dao.AttendanceRecordsRepository;
import com.shen.backend.Model.AttendanceRecords;
import com.shen.backend.Model.Employees;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceRecordsService {

    @Autowired
    private AttendanceRecordsRepository attendanceRecordsRepository;

    public AttendanceRecords save(AttendanceRecords attendanceRecord) {
        return attendanceRecordsRepository.save(attendanceRecord);
    }

    public List<AttendanceRecords> findAll() {
        return attendanceRecordsRepository.findAll();
    }

    public Optional<AttendanceRecords> findById(Long id) {
        return attendanceRecordsRepository.findById(id);
    }

    public List<AttendanceRecords> findByEmployee(Employees employee) {
        return attendanceRecordsRepository.findByEmployee(employee);
    }

    public void deleteById(Long id) {
        attendanceRecordsRepository.deleteById(id);
    }
}
