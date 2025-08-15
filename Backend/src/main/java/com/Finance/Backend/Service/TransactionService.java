package com.Finance.Backend.Service;

import com.Finance.Backend.Model.ReceiptData;
import com.Finance.Backend.Model.Transaction;
import com.Finance.Backend.Model.UserCred;
import com.Finance.Backend.Repository.TransactionRepository;
import com.Finance.Backend.Repository.UserCredRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserCredRepository userCredRepository;

    // Method to sanitize the response
    public String sanitizeResponse(String response) {
        // Step 1: Replace newlines and unwanted characters (like multiple spaces)
        response = response.replaceAll("(\r\n|\n)", " "); // Replace newlines with a space
        response = response.replaceAll("\\s{2,}", " "); // Remove extra spaces
        response = response.trim(); // Trim leading/trailing spaces

        // Step 2: Sanitize JSON field names by removing leading/trailing spaces from keys
        response = response.replaceAll("\"\\s*(\\w+)\\s*\"\\s*:", "\"$1\":");

        // Step 3: Fix any extra spaces in the date field
        Pattern pattern = Pattern.compile("\"date\": \"([^\"]+)\"");
        Matcher matcher = pattern.matcher(response);

        // Check if we have a match for the "date" field
        if (matcher.find()) {
            // Get the original date value and remove spaces within it
            String date = matcher.group(1).replaceAll("\\s+", "");
            // Replace the original date with the sanitized date
            response = response.replace(matcher.group(0), "\"date\": \"" + date + "\"");
        }

        return response;
    }

    // Method to convert ReceiptData to Transaction
    public Transaction convertReceiptToTransaction(ReceiptData receiptData, Long userId) {
        Transaction transaction = new Transaction();

        // Map values from receiptData to transaction
        transaction.setAmount(receiptData.getAmount());
        transaction.setCategory(receiptData.getCategory());
        transaction.setType("Debit");
        transaction.setDescription(receiptData.getDescription());

        // Convert date (String) to LocalDate
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(receiptData.getDate(), formatter);
        transaction.setDate(date);

        // Set userId
        transaction.setUserId(userId);

        return transaction;
    }

    public void addTransaction(Transaction transaction , Long Id) {
        transaction.setUserId(Id);
        transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactionById(Long id) {
        return transactionRepository.findAllByUserId(id);
    }

    public List<Transaction> saveAllTransactions(List<Transaction> transactions , Long Id) {
        for (Transaction transaction : transactions) {
            transaction.setUserId(Id);
        }
        return transactionRepository.saveAll(transactions);
    }

    public Page<Transaction> getPaginatedAndSortedTransactionsByUserId(Long userId, Pageable pageable) {
        return transactionRepository.findByUserId(userId, pageable);
    }

    public List<Transaction> getTransactionsByYearAndUser(int year, Long userId) {
        return transactionRepository.findByYearAndUser(year, userId);
    }

    public List<Transaction> getTransactionsByMonthAndUser(int month, Long userId) {
        return transactionRepository.findByMonthAndUser(month, userId);
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id).orElse(null);
    }

    public void updateTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
    }

    public void setBudget(Long budget, Long userId) {
        UserCred userCred = userCredRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        userCred.setBudget(budget);
        userCredRepository.save(userCred);
    }

    public Long getBudget(Long userId) {
        UserCred userCred = userCredRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return userCred.getBudget();
    }
}