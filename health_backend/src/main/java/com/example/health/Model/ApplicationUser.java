package com.example.health.Model;


import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name="users")
public class ApplicationUser {

    @Id
    @Column(name = "user_name")
    public String user_name;
    @Column(unique = true)
    public String user_email;
    public String password;
    public String user_mobile;
    public String location;


    public ApplicationUser(String user_name, String user_email, String password,
                           String user_mobile, String location) {
        super();
        this.user_name = user_name;
        this.user_email = user_email;
        this.password = password;
        this.user_mobile = user_mobile;
        this.location = location;
    }

    public ApplicationUser() {
        super();
    }

    public ApplicationUser(String user_name, String password) {
        this.user_name = user_name;
        this.password = password;
    }

}