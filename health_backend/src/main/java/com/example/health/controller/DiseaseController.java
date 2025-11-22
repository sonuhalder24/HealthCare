package com.example.health.controller;

import com.example.health.Model.Disease;
import com.example.health.service.DiseaseService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
//@RequestMapping("/api/diseases")
@CrossOrigin()
public class DiseaseController {
    private final DiseaseService diseaseService;

    public DiseaseController(DiseaseService diseaseService) {
        this.diseaseService = diseaseService;
    }

    @GetMapping("/api/diseases")
    public List<Disease> getAllDiseases() {
        return diseaseService.getAllDiseases();
    }
}
