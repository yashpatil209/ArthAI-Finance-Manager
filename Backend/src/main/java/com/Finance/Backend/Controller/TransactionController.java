package com.Finance.Backend.Controller;

import com.Finance.Backend.Model.ReceiptData;
import com.Finance.Backend.Model.Transaction;
import com.Finance.Backend.Service.GeminiAIService;
import com.Finance.Backend.Service.TransactionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping({"/transaction"})
public class TransactionController {
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private GeminiAIService geminiAIService;

    public TransactionController() {
    }

    @PostMapping({"/addtransaction/{Id}"})
    public ResponseEntity<?> addTransaction(@RequestBody Transaction transaction, @PathVariable Long Id) {
        try {
            this.transactionService.addTransaction(transaction, Id);
        } catch (Exception var4) {
            return new ResponseEntity(var4, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PostMapping({"/scanreceipt/{Id}"})
    public ResponseEntity<?> scanReceipt(@RequestParam("file") MultipartFile file, @PathVariable Long Id) {
        String response = "";
        Transaction transaction = null;
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            response = this.geminiAIService.receiptScanner(file);
            response = this.transactionService.sanitizeResponse(response);
            ReceiptData receiptData = (ReceiptData)objectMapper.readValue(response, ReceiptData.class);
            transaction = this.transactionService.convertReceiptToTransaction(receiptData, Id);
            this.transactionService.addTransaction(transaction, Id);
        } catch (Exception var7) {
            return new ResponseEntity(var7, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping({"/getalltransactionbyuserid"})
    public ResponseEntity<?> getAllTransactionById(@RequestParam Long userId) {
        List<Transaction> transaction = null;

        try {
            transaction = this.transactionService.getAllTransactionById(userId);
        } catch (Exception var4) {
            return new ResponseEntity(var4, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(transaction, HttpStatus.CREATED);
    }

    @PostMapping({"/addalltransactions/{Id}"})
    public ResponseEntity<List<Transaction>> saveTransactions(@RequestBody List<Transaction> transactions, @PathVariable Long Id) {
        List<Transaction> savedTransactions = this.transactionService.saveAllTransactions(transactions, Id);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTransactions);
    }

    @GetMapping({"/gettransactions/{userId}"})
    public Page<Transaction> getPaginatedAndSortedTransactions(@PathVariable Long userId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "date") String sortBy, @RequestParam(defaultValue = "ASC") String sortOrder) {
        Sort sort = Sort.by(new Sort.Order[]{Order.by(sortBy).with(Direction.fromString(sortOrder))});
        Pageable pageable = PageRequest.of(page, size, sort);
        return this.transactionService.getPaginatedAndSortedTransactionsByUserId(userId, pageable);
    }

    @GetMapping({"/gettransaction/{Id}"})
    public ResponseEntity<?> getTransactionById(@PathVariable Long Id) {
        Transaction transaction = null;

        try {
            transaction = this.transactionService.getTransactionById(Id);
        } catch (Exception var4) {
            return new ResponseEntity(var4, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(transaction, HttpStatus.OK);
    }

    @GetMapping({"/year/{year}/user/{userId}"})
    public List<Transaction> getTransactionsByYearAndUser(@PathVariable int year, @PathVariable Long userId) {
        return this.transactionService.getTransactionsByYearAndUser(year, userId);
    }

    @GetMapping({"/month/{month}/user/{userId}"})
    public List<Transaction> getTransactionsByMonthAndUser(@PathVariable int month, @PathVariable Long userId) {
        return this.transactionService.getTransactionsByMonthAndUser(month, userId);
    }

    @PutMapping({"/delete/{id}"})
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        try {
            this.transactionService.deleteTransaction(id);
        } catch (Exception var3) {
            return new ResponseEntity(var3, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping({"/update"})
    public ResponseEntity<?> updateTransaction(@RequestBody Transaction transaction) {
        try {
            this.transactionService.updateTransaction(transaction);
        } catch (Exception var3) {
            return new ResponseEntity(var3, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping({"/user/{userId}/budget/{budget}"})
    public ResponseEntity<?> setBudget(@PathVariable Long userId, @PathVariable Long budget) {
        try {
            this.transactionService.setBudget(budget, userId);
        } catch (Exception var4) {
            return new ResponseEntity(var4, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping({"/getbudget/{userId}"})
    public ResponseEntity<?> getBudget(@PathVariable Long userId) {
        try {
            Long budget = this.transactionService.getBudget(userId);
            return new ResponseEntity(budget, HttpStatus.OK);
        } catch (Exception var3) {
            return new ResponseEntity(var3, HttpStatus.BAD_REQUEST);
        }
    }
}
