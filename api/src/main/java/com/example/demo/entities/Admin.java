package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*; // Lombok imports
import java.util.HashSet;
import java.util.Set;

@Getter // Lombok annotation
@Setter // Lombok annotation
@NoArgsConstructor // Lombok annotation
@EqualsAndHashCode(callSuper = false, exclude = {"adminRoles", "createdApplications", "createdCustomers", "createdInvoices", "createdLicenses", "createdLicensePackages"}) // Lombok annotation
@ToString(exclude = {"adminRoles", "createdApplications", "createdCustomers", "createdInvoices", "createdLicenses", "createdLicensePackages"}) // Lombok annotation
@Entity
@Table(name = "admins", uniqueConstraints = {
    @UniqueConstraint(columnNames = "username", name = "username_unique")
})
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Integer adminId;

    @Column(name = "username", nullable = false, length = 100)
    private String username;

    @Column(name = "password", nullable = false, length = 100)
    private String password; // Remember to handle password hashing securely

    @Column(name = "admin_name", nullable = false, length = 100)
    private String adminName;

    // --- Relationships ---

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<AdminRole> adminRoles = new HashSet<>();

    /*
    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "admin_roles",6
               joinColumns = @JoinColumn(name = "admin_id"),
               inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
    */

    @OneToMany(mappedBy = "createdByAdmin", fetch = FetchType.LAZY)
    private Set<Application> createdApplications = new HashSet<>();

    @OneToMany(mappedBy = "createdByAdmin", fetch = FetchType.LAZY)
    private Set<Customer> createdCustomers = new HashSet<>();

    @OneToMany(mappedBy = "createdByAdmin", fetch = FetchType.LAZY)
    private Set<Invoice> createdInvoices = new HashSet<>();

    @OneToMany(mappedBy = "createdByAdmin", fetch = FetchType.LAZY)
    private Set<License> createdLicenses = new HashSet<>();

    @OneToMany(mappedBy = "createdByAdmin", fetch = FetchType.LAZY)
    private Set<LicensePackage> createdLicensePackages = new HashSet<>();

    // No explicit constructors, getters, setters needed - Lombok provides them
}