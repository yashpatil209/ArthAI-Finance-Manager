package com.Finance.Backend.Service;

import com.Finance.Backend.Model.UserCred;
import com.Finance.Backend.Repository.UserCredRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailService implements UserDetailsService {
    @Autowired
    private UserCredRepository userCredRepository;

    public UserDetailService() {
    }

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserCred userCred = this.userCredRepository.findByEmail(email);
        if (userCred != null) {
            return User.withUsername(userCred.getEmail()).password(userCred.getPassword()).build();
        } else {
            throw new UsernameNotFoundException("User not found with username: " + email);
        }
    }
}
