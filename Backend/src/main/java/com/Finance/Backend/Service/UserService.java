package com.Finance.Backend.Service;

import com.Finance.Backend.Model.UserCred;
import com.Finance.Backend.Repository.UserCredRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserCredRepository userCredRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService() {
    }

    public UserCred registerUser(UserCred userCred) {
        if (this.userCredRepository.existsByEmail(userCred.getEmail())) {
            throw new RuntimeException("Email Already Exists!");
        } else {
            userCred.setPassword(this.passwordEncoder.encode(userCred.getPassword()));
            return (UserCred)this.userCredRepository.save(userCred);
        }
    }
}
