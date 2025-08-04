package com.shen.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shen.backend.Dao.AttendanceRecordsRepository;
import com.shen.backend.Model.AttendanceRecords;
import com.shen.backend.Model.AttendanceType;
import com.shen.backend.Model.Employees;
import java.util.List;
import java.util.Optional;
import java.util.Date;
import java.util.Calendar;

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

    // 獲取員工今天的打卡記錄
    public List<AttendanceRecords> getTodayRecords(Employees employee) {
        Date now = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(now);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date startOfDay = cal.getTime();

        cal.add(Calendar.DAY_OF_MONTH, 1);
        Date endOfDay = cal.getTime();

        return attendanceRecordsRepository.findByEmployeeAndDate(employee, startOfDay, endOfDay);
    }

    // 檢查是否可以打上班卡
    public boolean canCheckIn(Employees employee) {
        List<AttendanceRecords> todayRecords = getTodayRecords(employee);
        if (todayRecords.isEmpty()) {
            return true; // 今天還沒有打卡記錄，可以打上班卡
        }

        // 獲取最新的打卡記錄
        AttendanceRecords lastRecord = todayRecords.get(0);
        return lastRecord.getType() == AttendanceType.clock_out; // 最後一次是下班，可以再打上班卡
    }

    // 檢查是否可以打下班卡
    public boolean canCheckOut(Employees employee) {
        List<AttendanceRecords> todayRecords = getTodayRecords(employee);
        if (todayRecords.isEmpty()) {
            return false; // 今天還沒有打卡記錄，不能打下班卡
        }

        // 獲取最新的打卡記錄
        AttendanceRecords lastRecord = todayRecords.get(0);
        return lastRecord.getType() == AttendanceType.clock_in; // 最後一次是上班，可以打下班卡
    }
}
