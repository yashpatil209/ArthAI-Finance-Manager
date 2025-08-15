package com.Finance.Backend.Controller;

import com.Finance.Backend.Model.ReceiptData;
import com.Finance.Backend.Model.Transaction;
import com.Finance.Backend.Model.UserCred;
import com.Finance.Backend.Service.GeminiAIService;
import com.Finance.Backend.Service.TransactionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private GeminiAIService geminiAIService;


    @PostMapping("/addtransaction/{Id}")
    public ResponseEntity<?> addTransaction(@RequestBody Transaction transaction , @PathVariable Long Id){
        try {
            transactionService.addTransaction(transaction, Id);
        }catch (Exception e){
            return new ResponseEntity<>(e , HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/scanreceipt/{Id}")
    public ResponseEntity<?> scanReceipt(@RequestParam("file") MultipartFile file, @PathVariable Long Id){
        String response = "";
        Transaction transaction = null;
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            response = geminiAIService.receiptScanner(file);

            response = transactionService.sanitizeResponse(response);
            ReceiptData receiptData = objectMapper.readValue(response, ReceiptData.class);
            transaction = transactionService.convertReceiptToTransaction(receiptData, Id);

            transactionService.addTransaction(transaction, Id);
        }catch (Exception e){
            return new ResponseEntity<>(e , HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/getalltransactionbyuserid")
    public ResponseEntity<?> getAllTransactionById(@RequestParam Long userId){
        List<Transaction> transaction = null;
        try {
            transaction = transactionService.getAllTransactionById(userId);
        }catch (Exception e){
            return new ResponseEntity<>(e , HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(transaction , HttpStatus.CREATED);
    }

    @PostMapping("/addalltransactions/{Id}")
    public ResponseEntity<List<Transaction>> saveTransactions(@RequestBody List<Transaction> transactions, @PathVariable Long Id) {
        List<Transaction> savedTransactions = transactionService.saveAllTransactions(transactions , Id);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTransactions);
    }

    @GetMapping("/gettransactions/{userId}")
    public Page<Transaction> getPaginatedAndSortedTransactions(
            @PathVariable Long userId, // Get the userId from the path
            @RequestParam(defaultValue = "0") int page, // Default page = 0 (first page)
            @RequestParam(defaultValue = "10") int size, // Default size = 10 records per page
            @RequestParam(defaultValue = "date") String sortBy, // Default sort by 'date'
            @RequestParam(defaultValue = "ASC") String sortOrder // Default sort order = 'ASC'
    ) {
        Sort sort = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.fromString(sortOrder)));
        Pageable pageable = PageRequest.of(page, size, sort);
        return transactionService.getPaginatedAndSortedTransactionsByUserId(userId, pageable);
    }

    @GetMapping("/gettransaction/{Id}")
    public ResponseEntity<?> getTransactionById(@PathVariable Long Id){
        Transaction transaction = null;
        try {
            transaction = transactionService.getTransactionById(Id);
        }catch (Exception e){
            return new ResponseEntity<>(e , HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(transaction , HttpStatus.OK);
    }

    @GetMapping("/year/{year}/user/{userId}")
    public List<Transaction> getTransactionsByYearAndUser(
            @PathVariable int year,
            @PathVariable Long userId) {
        return transactionService.getTransactionsByYearAndUser(year, userId);
    }

    @GetMapping("/month/{month}/user/{userId}")
    public List<Transaction> getTransactionsByMonthAndUser(
            @PathVariable int month,
            @PathVariable Long userId) {
        return transactionService.getTransactionsByMonthAndUser(month, userId);
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        try {
            transactionService.deleteTransaction(id);
        }catch (Exception e){
            return new ResponseEntity<>(e , HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateTransaction(@RequestBody Transaction transaction) {
        try {
            transactionService.updateTransaction(transaction);
        }catch (Exception e){
            return new ResponseEntity<>(e , HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/user/{userId}/budget/{budget}")
    public ResponseEntity<?> setBudget(@PathVariable Long userId, @PathVariable Long budget) {
        try {
            transactionService.setBudget(budget, userId);
        }catch (Exception e){
            return new ResponseEntity<>(e , HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getbudget/{userId}")
    public ResponseEntity<?> getBudget(@PathVariable Long userId) {
        try {
            Long budget = transactionService.getBudget(userId);
            return new ResponseEntity<>(budget, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e , HttpStatus.BAD_REQUEST);
        }
    }

}