package com.example.health.controller;

import com.example.health.Model.Appointment;
import com.example.health.Model.Patient;
import com.example.health.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AppointmentController {
    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    //@PostMapping("/register")
    @PostMapping("/reqappointments")
    public ResponseEntity<Map<String, Object>> saveBooking(@RequestBody Appointment a){
        boolean isSaved = appointmentService.saveAppointment(a);
        /*if(isSaved){
            return "Booking successful";
        }
        return "Booking failure";*/
        Map<String, Object> response = new HashMap<>();
        response.put("success", isSaved);
        response.put("message", isSaved ? "Booking successful" : "Booking failure");

        return ResponseEntity.ok(response);
    }

    //@GetMapping("/list")
    @GetMapping("/reqappointments")
    public List<Appointment> getAllAppointment(){
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/view/{appointmentId}")
    public Optional<Appointment> getAppointmentByAppId(@PathVariable("appointmentId") String appId){
        return appointmentService.getAppointmentByAppId(appId);
    }
    //@GetMapping("/list/{patientid}")
    @GetMapping("/reqappointments/{patientid}")
    public List<Appointment> getAppointmentByPatiId(@PathVariable("patientid") String patientId){
        return appointmentService.getAppointmentByPatientId(patientId);
    }
    //@DeleteMapping("/delete/{appointmentId}")
    @DeleteMapping("/reqappointments/{appointmentId}")
    public void deleteAppointment(@PathVariable("appointmentId") String appId){
        appointmentService.deleteAppointment(appId);
    }
}
