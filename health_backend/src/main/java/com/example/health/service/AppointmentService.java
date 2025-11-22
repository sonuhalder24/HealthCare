package com.example.health.service;

import com.example.health.Model.Appointment;
import com.example.health.Model.Patient;
import com.example.health.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    @Autowired
    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    //register
    public boolean saveAppointment(Appointment a) {
        if (a.getBooking_id() == null || a.getBooking_id().isEmpty()) {
            String newId = generateCustomId();
            a.setBooking_id(newId);
        }
        try {
            appointmentRepository.save(a);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    private String generateCustomId() {
        // Example: Get last ID and increment
        List<Appointment> appointments = appointmentRepository.findAllBookingOrderByBookingIdDesc();
        String lastId = appointments.isEmpty() ? null : appointments.get(0).getBooking_id();
        int number = 1000; // Start from APP1000

        if (lastId != null && lastId.startsWith("APP")) {
            try {
                number = Integer.parseInt(lastId.substring(3)) + 1;
            } catch (NumberFormatException ignored) {
            }
        }

        return "APP" + number;
    }

    //get list
    public List<Appointment> getAllAppointments(){
        return appointmentRepository.findAll();
    }
    //get by a appid
    public Optional<Appointment> getAppointmentByAppId(String appId){
        return appointmentRepository.findById(appId);
    }
    //by patient id
    public List<Appointment> getAppointmentByPatientId(String patientid) {
        return appointmentRepository.findByPatientId(patientid);
    }
    //delete by appid
    public void deleteAppointment(String appintId) {
        appointmentRepository.deleteById(appintId);
    }


}
