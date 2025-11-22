package com.example.health.Model;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@Table(name="appointment")
public class Appointment {
    @Id
    @Column(name = "booking_id")
    private String booking_id;
    private String disease;
    private Date tentativeDate;
    private String priority;
    private String patient_id;
    @Column(name = "booking_time")
    private Date bookingTime;

    public Appointment(String disease, Date tentativeDate, String priority, String patient_id) {
        super();
        this.disease = disease;
        this.tentativeDate = tentativeDate;
        this.priority = priority;
        this.patient_id = patient_id;
    }
}
