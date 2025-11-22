package com.example.health.service;

import com.example.health.Model.ApplicationUser;
import com.example.health.repository.ApplicationUserRepository;
import com.example.health.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ApplicationUserService implements UserDetailsService {
    @Autowired
    private ApplicationUserRepository applicationUserRepository;
    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);

    @Override
    public UserDetails loadUserByUsername(String username /*useremail*/) throws UsernameNotFoundException {
        ApplicationUser user=applicationUserRepository.findByUserName(username);
        //ApplicationUser user=applicationUserRepository.findByEmail(useremail);
        if(user==null){
            System.out.println("User 404");
            throw new UsernameNotFoundException("User 404");
        }
        return new UserDetailsImpl(user);
    }

    //accordingly chatgpt
    public boolean isValid(ApplicationUser user) {
        // Basic username: at least 4 characters
        // Password: at least 6 characters and includes a digit
        return user.getUser_name() != null && user.getUser_name().length() >= 4
                && user.getPassword() != null && user.getPassword().length() >= 6;

    }//accordingly chatgpt

    //register
    public boolean saveAppUser(ApplicationUser user){
        user.setPassword(encoder.encode(user.getPassword()));
        System.out.println(user.getPassword());
        if (!isValid(user)) {
            return false;
        }
        applicationUserRepository.save(user);
        return true;
    }

    //viewprofile
    public ApplicationUser getUserById(String username) {
        return applicationUserRepository.findByUserName(username);
    }

    //editprofile
    public ApplicationUser editUserName(String id, ApplicationUser userInput) {
        ApplicationUser existingUser = applicationUserRepository.findByUserName(id);
        if (existingUser != null) {
            if(userInput.getUser_name()!=null)existingUser.setUser_name(userInput.getUser_name());
            if(userInput.getUser_email()!=null)existingUser.setUser_email(userInput.getUser_email());
            if(userInput.getPassword()!=null)existingUser.setPassword(encoder.encode(userInput.getPassword())); // re-encode
            if(userInput.getUser_mobile()!=null)existingUser.setUser_mobile(userInput.getUser_mobile());
            if(userInput.getLocation()!=null)existingUser.setLocation(userInput.getLocation());
            return applicationUserRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found with ID: " + id);
        }
    }
}