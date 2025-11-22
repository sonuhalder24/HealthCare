package com.example.health.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.health.Model.ApplicationUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface ApplicationUserRepository extends JpaRepository<ApplicationUser,String> {

    @Query("SELECT a FROM ApplicationUser a WHERE a.user_name = :username")
    ApplicationUser findByUserName(@Param("username") String username);

    @Query("SELECT a FROM ApplicationUser a WHERE a.user_email = :useremail")
    ApplicationUser findByEmail(@Param("useremail") String useremail);

}
