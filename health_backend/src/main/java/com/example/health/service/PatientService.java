package com.example.health.service;


import com.example.health.Model.Patient;
import com.example.health.repository.PatientRepository;

import java.util.Date;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
    private final PatientRepository patientRepository;

    public PatientService (PatientRepository repository){
        this.patientRepository=repository;
    }
    public boolean savePatient(Patient p) {
        /*if (p.getRegisteredDate() == null) {
            p.setRegisteredDate(new Date()); // ⬅ System date-time
        }*/
        // 1️⃣ Combine firstName + lastName from frontend into patient_name
        if (p.getFirstName() != null && p.getLastName() != null) {
            p.setPatient_name(p.getFirstName() + " " + p.getLastName());
        }

        if (p.getPatient_Id() == null || p.getPatient_Id().isEmpty()) {
            String newId = generateCustomId();
            p.setPatient_Id(newId);
        }
        try {
            patientRepository.save(p);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    private String generateCustomId() {
        // Example: Get last ID and increment
        List<Patient> patients = patientRepository.findAllPatientsOrderByPatientIdDesc();
        String lastId = patients.isEmpty() ? null : patients.get(0).getPatient_Id();
        int number = 1000; // Start from PAT1001

        if (lastId != null && lastId.startsWith("PAT")) {
            try {
                number = Integer.parseInt(lastId.substring(3)) + 1;
            } catch (NumberFormatException ignored) {
            }
        }

        return "PAT" + number;
    }
    //all patient
    public List<Patient> getAllPatients() {
        //return patientRepository.findAll();
        List<Patient> list = patientRepository.findAll();

        for (Patient p : list) {
            splitName(p);
        }

        return list;
    }
    private void splitName(Patient p) {
        if (p.getPatient_name() != null) {
            String[] parts = p.getPatient_name().split(" ", 2);
            p.setFirstName(parts[0]);
            p.setLastName(parts.length > 1 ? parts[1] : "");
        }
    }
    //patient by id
    public Patient getPatientById(String id) {
        Patient p= patientRepository.findByPatientId(id);
        if (p != null) {
            splitName(p);
        }
        return p;
    }
    //delete patient
    public void deletePatient(String id) {
        patientRepository.deleteById(id);
    }

}

