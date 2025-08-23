package com.Finance.Backend.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import lombok.Generated;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.stereotype.Component;

@Component
@Entity
public class UserCred {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(
            nullable = false,
            name = "user_id"
    )
    private Long UserId;
    private String name;
    @Column(
            unique = true
    )
    private String email;
    private String password;
    @ColumnDefault("0")
    private Long budget;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    public Long getUserId() {
        return this.UserId;
    }

    public void setUserId(Long userId) {
        this.UserId = userId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Long getBudget() {
        return this.budget;
    }

    public void setBudget(Long budget) {
        this.budget = budget;
    }


}
