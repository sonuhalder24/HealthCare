package com.example.health.repository;

import com.example.health.Model.Patient;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PatientRepository extends JpaRepository<Patient,String> {

    @Query("SELECT p FROM Patient p WHERE p.patient_Id LIKE 'PAT%' ORDER BY p.patient_Id DESC")
    List<Patient> findAllPatientsOrderByPatientIdDesc();

    @Query("SELECT a FROM Patient a WHERE a.patient_Id = :patientId")
    Patient findByPatientId(@Param("patientId") String patientId);
}
