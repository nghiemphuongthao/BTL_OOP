package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false, exclude = {"createdByAdmin", "invoices"})
@ToString(exclude = {"createdByAdmin", "invoices"})
@Entity
@Table(name = "customers", uniqueConstraints = {
    @UniqueConstraint(columnNames = "username", name = "customers_unique")
})
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Integer customerId;

    @Column(name = "username", nullable = false, length = 100)
    private String username;

    @Column(name = "password", nullable = false, length = 100)
    private String password; // Secure hashing needed

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false, foreignKey = @ForeignKey(name = "customers_admins_FK"))
    private Admin createdByAdmin;

    @CreationTimestamp // Assuming created_at should be a timestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt; // DDL says VARCHAR(100) - mapped as Timestamp assuming error.

    // --- Relationships ---
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Invoice> invoices = new HashSet<>();

    // No explicit constructors, getters, setters needed
}