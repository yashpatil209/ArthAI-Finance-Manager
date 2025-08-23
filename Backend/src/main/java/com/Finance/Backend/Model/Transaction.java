package com.Finance.Backend.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.time.LocalDate;
import lombok.Generated;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.stereotype.Component;

@Component
@Entity
public class Transaction {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long Id;
    private int amount;
    private String category;
    @ColumnDefault("'Debit'")
    private String type;
    private String description;
    @Temporal(TemporalType.DATE)
    @JsonFormat(
            shape = Shape.STRING,
            pattern = "yyyy-MM-dd"
    )
    private LocalDate date;
    private Long userId;

    public Long getId() {
        return this.Id;
    }

    public void setId(Long id) {
        this.Id = id;
    }

    public int getAmount() {
        return this.amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


}
