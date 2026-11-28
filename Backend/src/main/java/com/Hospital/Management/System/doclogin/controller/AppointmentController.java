package com.Hospital.Management.System.doclogin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.management.AttributeNotFoundException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Hospital.Management.System.doclogin.entity.Appointment;
import com.Hospital.Management.System.doclogin.repository.AppointmentsRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController 
@RequestMapping("/api/appointments") 
public class AppointmentController {

    private AppointmentsRepository appointmentRepository;

    public AppointmentController(AppointmentsRepository appointmentRepository) {
        super();
        this.appointmentRepository = appointmentRepository;
    }

    @PostMapping("/insert")
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        appointment.setId(null);
        return appointmentRepository.save(appointment);
    }

    @GetMapping
    public List<Appointment> getAllAppointments()
    { 
        return appointmentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        return appointmentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Appointment> updateAppointment(
            @PathVariable Long id,
            @RequestBody Appointment updatedAppointment) {
        return appointmentRepository.findById(id)
                .map(appointment -> {
                    appointment.setName(updatedAppointment.getName());
                    appointment.setAge(updatedAppointment.getAge());
                    appointment.setSymptoms(updatedAppointment.getSymptoms());
                    appointment.setNumber(updatedAppointment.getNumber());
                    return ResponseEntity.ok(appointmentRepository.save(appointment));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteAppointment(@PathVariable Long id) throws AttributeNotFoundException{
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new AttributeNotFoundException("Appointment not found with id: " + id));
        appointmentRepository.delete(appointment);
        Map<String, Boolean> response = new HashMap<String,Boolean>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
