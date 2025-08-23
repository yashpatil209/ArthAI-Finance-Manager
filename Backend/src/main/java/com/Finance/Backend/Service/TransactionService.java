package com.Finance.Backend.Service;

import com.Finance.Backend.Model.ReceiptData;
import com.Finance.Backend.Model.Transaction;
import com.Finance.Backend.Model.UserCred;
import com.Finance.Backend.Repository.TransactionRepository;
import com.Finance.Backend.Repository.UserCredRepository;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private UserCredRepository userCredRepository;

    public TransactionService() {
    }

    public String sanitizeResponse(String response) {
        response = response.replaceAll("(\r\n|\n)", " ");
        response = response.replaceAll("\\s{2,}", " ");
        response = response.trim();
        response = response.replaceAll("\"\\s*(\\w+)\\s*\"\\s*:", "\"$1\":");
        Pattern pattern = Pattern.compile("\"date\": \"([^\"]+)\"");
        Matcher matcher = pattern.matcher(response);
        if (matcher.find()) {
            String date = matcher.group(1).replaceAll("\\s+", "");
            response = response.replace(matcher.group(0), "\"date\": \"" + date + "\"");
        }

        return response;
    }

    public Transaction convertReceiptToTransaction(ReceiptData receiptData, Long userId) {
        Transaction transaction = new Transaction();
        transaction.setAmount(receiptData.getAmount());
        transaction.setCategory(receiptData.getCategory());
        transaction.setType("Debit");
        transaction.setDescription(receiptData.getDescription());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(receiptData.getDate(), formatter);
        transaction.setDate(date);
        transaction.setUserId(userId);
        return transaction;
    }

    public void addTransaction(Transaction transaction, Long Id) {
        transaction.setUserId(Id);
        this.transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactionById(Long id) {
        return this.transactionRepository.findAllByUserId(id);
    }

    public List<Transaction> saveAllTransactions(List<Transaction> transactions, Long Id) {
        Iterator var3 = transactions.iterator();

        while(var3.hasNext()) {
            Transaction transaction = (Transaction)var3.next();
            transaction.setUserId(Id);
        }

        return this.transactionRepository.saveAll(transactions);
    }

    public Page<Transaction> getPaginatedAndSortedTransactionsByUserId(Long userId, Pageable pageable) {
        return this.transactionRepository.findByUserId(userId, pageable);
    }

    public List<Transaction> getTransactionsByYearAndUser(int year, Long userId) {
        return this.transactionRepository.findByYearAndUser(year, userId);
    }

    public List<Transaction> getTransactionsByMonthAndUser(int month, Long userId) {
        return this.transactionRepository.findByMonthAndUser(month, userId);
    }

    public void deleteTransaction(Long id) {
        this.transactionRepository.deleteById(id);
    }

    public Transaction getTransactionById(Long id) {
        return (Transaction)this.transactionRepository.findById(id).orElse(null);
    }

    public void updateTransaction(Transaction transaction) {
        this.transactionRepository.save(transaction);
    }

    public void setBudget(Long budget, Long userId) {
        UserCred userCred = (UserCred)this.userCredRepository.findById(userId).orElseThrow(() -> {
            return new IllegalArgumentException("User not found");
        });
        userCred.setBudget(budget);
        this.userCredRepository.save(userCred);
    }

    public Long getBudget(Long userId) {
        UserCred userCred = (UserCred)this.userCredRepository.findById(userId).orElseThrow(() -> {
            return new IllegalArgumentException("User not found");
        });
        return userCred.getBudget();
    }
}
