package com.Finance.Backend.Controller;

import com.Finance.Backend.Model.UserCred;
import com.Finance.Backend.Repository.UserCredRepository;
import com.Finance.Backend.Service.JwtService;
import com.Finance.Backend.Service.UserService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserCredRepository userCredRepository;

    public UserController() {
    }

    @GetMapping("/")
    public String Hello(){
        return "Hello Yash";
    }

    @PostMapping({"/register"})
    public ResponseEntity<?> register(@RequestBody UserCred userCred) {
        UserCred userCred1 = null;

        try {
            userCred1 = this.userService.registerUser(userCred);
        } catch (Exception var4) {
            return new ResponseEntity(var4, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(userCred1, HttpStatus.CREATED);
    }

    @PostMapping({"/login"})
    public ResponseEntity<?> login(@RequestBody UserCred userCred) {
        UserCred userCred1 = this.userCredRepository.findByEmail(userCred.getEmail());
        Map<String, Object> response = new HashMap();
        if (userCred1 == null) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        } else {
            Authentication authentication = this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userCred.getEmail(), userCred.getPassword()));
            String jwtToken = "";
            if (authentication.isAuthenticated()) {
                jwtToken = this.jwtService.generateToken(userCred.getEmail());
                response.put("token", jwtToken);
                response.put("user", userCred1);
                return new ResponseEntity(response, HttpStatus.OK);
            } else {
                return new ResponseEntity(HttpStatus.BAD_REQUEST);
            }
        }
    }
}

