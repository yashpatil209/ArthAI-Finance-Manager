package com.Finance.Backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Generated;
import org.springframework.stereotype.Component;

@Component
@Entity
public class ReceiptData {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long Id;
    private int amount;
    private String category;
    private String description;
    private String date;

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

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }




}
