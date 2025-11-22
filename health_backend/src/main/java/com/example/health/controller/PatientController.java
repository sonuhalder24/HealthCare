package com.example.health.controller;

import com.example.health.Model.ApplicationUser;
import com.example.health.Model.Patient;
import com.example.health.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
//@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private final PatientService patientService;

    public PatientController(PatientService pService){
        this.patientService=pService;
    }

    //@PostMapping("/register")
    @PostMapping("/api/allpatients")
    public ResponseEntity<?> savePatient(@RequestBody Patient p){
        boolean isSaved = patientService.savePatient(p);
        if(isSaved){
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Patient saved successfully"
            ));
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    Map.of("status", "error", "message", "Failed to save patient")
            );
        }

    }

    //@GetMapping("/list")
    @GetMapping("/api/allpatients")
    public List<Patient> getAll() {
        return patientService.getAllPatients();
    }

    //@GetMapping("/view/{Id}")
    @GetMapping("/api/allpatients/{Id}")
    public Patient getPatientById(@PathVariable("Id") String id) {
        return patientService.getPatientById(id);
    }

    @DeleteMapping("/delete/{Id}")
    public ResponseEntity<Void> delete(@PathVariable("Id") String id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }

}
