package com.Finance.Backend.Repository;

import com.Finance.Backend.Model.UserCred;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCredRepository extends JpaRepository<UserCred, Long> {
    UserCred findByEmail(String email);

    boolean existsByEmail(String email);
}
