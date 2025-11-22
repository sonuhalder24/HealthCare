package com.example.health.repository;

import com.example.health.Model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment,String> {

    @Query("SELECT a FROM Appointment a WHERE a.patient_id = :pid")
    List<Appointment> findByPatientId(@Param("pid") String patientId);

    @Query("SELECT a FROM Appointment a WHERE a.booking_id LIKE 'APP%' ORDER BY a.booking_id DESC")
    List<Appointment> findAllBookingOrderByBookingIdDesc();
}
