package com.Finance.Backend.Repository;

import com.Finance.Backend.Model.Transaction;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Page<Transaction> findByUserId(Long userId, Pageable pageable);

    @Query("SELECT t FROM Transaction t WHERE YEAR(t.date) = :year AND t.userId = :userId")
    List<Transaction> findByYearAndUser(@Param("year") int year, @Param("userId") Long userId);

    List<Transaction> findAllByUserId(Long id);

    @Query("SELECT t FROM Transaction t WHERE FUNCTION('MONTH', t.date) = :month AND t.userId = :userId")
    List<Transaction> findByMonthAndUser(int month, Long userId);
}
