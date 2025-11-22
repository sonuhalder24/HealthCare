package com.example.health.repository;

import com.example.health.Model.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public interface DiseaseRepository extends JpaRepository<Disease, Integer> {
}
