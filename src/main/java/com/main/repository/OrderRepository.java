package com.main.repository;

import com.main.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Orders, String> {

    List<Orders> findAllByOrderByDateCreatedDesc();

    List<Orders> findByUserIdOrderByDateCreatedDesc(int userId);

    @Query("SELECT CalculateTotalOrderPrice(:userId)")
    BigDecimal sumOrdersPriceByAccountIdProfile(@Param("userId") Integer userId);

    @Query("SELECT COUNT(o) FROM Orders o JOIN o.usersByUserId a WHERE a.id = :userId")
    BigDecimal countOrdersByAccountIdProfile(@Param("userId") Integer userId);

    // doanh thu năm

    @Query("SELECT DISTINCT YEAR(o.dateCreated) FROM Orders o ORDER BY YEAR(o.dateCreated) DESC")
    List<Integer> findDistinctOrdersByYear();

    @Query("SELECT SUM(ct.price * ct.quantity + o.orderShipCost) as totalAmount, o" +
            " FROM Orders o JOIN o.orderItemsById ct" +
            " WHERE EXTRACT(YEAR FROM o.dateCreated) = :year and o.paymentStatus = 1" +
            " GROUP BY o")
    List<Object[]> getOrdersByCreatedAt_Year(@Param("year") int year);

    //COALESCE trả về giá trị đầu là 0
    @Query("SELECT COALESCE(SUM(ct.price * ct.quantity + o.orderShipCost), 0) " +
            "FROM Orders o " +
            "JOIN o.orderItemsById ct " +
            "JOIN o.usersByUserId a " +
            "WHERE EXTRACT(YEAR FROM o.dateCreated) = :year and o.paymentStatus = 1")
    double calculateRevenueForYear(@Param("year") int year);

    @Query(value = "SELECT TotalRevenue / NumberOfYears AS AverageRevenue " +
            "FROM (SELECT (SELECT SUM(ct.price * ct.quantity + o.order_ship_cost) " +
            "FROM orders o JOIN order_items ct ON ct.order_id = o.id " +
            "WHERE o.payment_status = 1) AS TotalRevenue, (SELECT COUNT(DISTINCT year(date_created)) " +
            "FROM Orders WHERE payment_status = 1) AS NumberOfYears ) AS SubQuery ", nativeQuery = true)
    List<Integer> calculateAverageRevenue();

    @Query(value = "CALL findTopSellingProducts(:parameter)", nativeQuery = true)
    List<Object> findTopSellingProducts(@Param("parameter") int parameter);

    @Query("SELECT MONTH(o.dateCreated), SUM(o.orderShipCost) FROM Orders o WHERE YEAR(o.dateCreated) = :year GROUP BY MONTH(o.dateCreated)")
    List<Object[]> getRevenueByYear(@Param("year") int year);

    @Query(value = "CALL calculateDailyRevenue(:inputDay, :inputMonth, :inputYear)", nativeQuery = true)
    BigDecimal calculateDailyRevenue(
            @Param("inputDay") Integer inputDay,
            @Param("inputMonth") Integer inputMonth,
            @Param("inputYear") Integer inputYear
    );

    @Query(value = "CALL RevenueMonthComparison(:inputMonth, :inputYear)", nativeQuery = true)
    Optional<Object> MonthlyRevenue(@Param("inputMonth") Integer inputMonth, @Param("inputYear") Integer inputYear);

    @Query("SELECT p.id, pb.brandName, p.productName, SUM(ot.quantity), SUM((ot.quantity * ot.price) + o.orderShipCost) " +
            "FROM Orders o " +
            "JOIN o.orderItemsById ot " +
            "JOIN ot.productsByProductId p " +
            "JOIN p.productBrandsByProductBrandId pb " +
            "WHERE MONTH(o.dateCreated) = :month AND YEAR(o.dateCreated) = :year " +
            "GROUP BY p.id")
    List<Object> findProductSalesInfoByMonthAndYear(@Param("month") int month, @Param("year") int year);

    @Query("SELECT AVG((ot.quantity * ot.price) + o.orderShipCost) " +
            "FROM Orders o " +
            "JOIN o.orderItemsById ot " +
            "WHERE YEAR(o.dateCreated) = :year " +
            "GROUP BY MONTH(o.dateCreated)")
    List<BigDecimal> calculateAverageMonthlyRevenue(@Param("year") int year);


}