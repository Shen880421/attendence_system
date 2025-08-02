package com.shen.backend.Model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class AttendanceRecords {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Employees employee;

    @Enumerated(EnumType.STRING)
    private AttendanceType type;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "attendance_timestamp")
    private Date timestamp;

    private String location;

    @PrePersist
    protected void onCreate() {
        if (timestamp == null) {
            timestamp = new Date();
        }
    }

    public AttendanceRecords() {
    }

    public AttendanceRecords(Employees employee, AttendanceType type, Date timestamp, String location) {
        this.employee = employee;
        this.type = type;
        this.timestamp = timestamp;
        this.location = location;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employees getEmployee() {
        return employee;
    }

    public void setEmployee(Employees employee) {
        this.employee = employee;
    }

    public AttendanceType getType() {
        return type;
    }

    public void setType(AttendanceType type) {
        this.type = type;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}