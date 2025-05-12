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
@EqualsAndHashCode(callSuper = false, exclude = {"createdByAdmin", "application", "invoiceDetails"})
@ToString(exclude = {"createdByAdmin", "application", "invoiceDetails"})
@Entity
@Table(name = "license_packages")
public class LicensePackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "license_package_id")
    private Integer licensePackageId;

    @Column(name = "code", nullable = false, length = 100)
    private String code;

    @Column(name = "nane", nullable = false, length = 100) // Column name is "nane" in SQL
    private String name; // Java field name "name"

    @Column(name = "exp_months", nullable = false)
    private Integer expirationMonths;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false, foreignKey = @ForeignKey(name = "license_packages_admins_FK"))
    private Admin createdByAdmin;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false, foreignKey = @ForeignKey(name = "license_packages_applications_FK"))
    private Application application;

    // --- Relationships ---
    @OneToMany(mappedBy = "licensePackage", fetch = FetchType.LAZY)
    private Set<InvoiceDetail> invoiceDetails = new HashSet<>();

    // No explicit constructors, getters, setters needed
}