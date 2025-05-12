package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.sql.Timestamp;

@Getter
@Setter // Lombok will generate setters for other fields
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false, exclude = {"createdByAdmin", "invoiceDetail"})
@ToString(exclude = {"createdByAdmin", "invoiceDetail"})
@Entity
@Table(name = "licenses")
public class License {

    @Id
    // No @GeneratedValue because the ID comes from InvoiceDetail (via @MapsId)
    @Column(name = "license_id")
    private Integer licenseId;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    // Default handled by DB or application logic before save
    @Column(name = "active_at", nullable = false)
    private Timestamp activeAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false, foreignKey = @ForeignKey(name = "licenses_admins_FK"))
    private Admin createdByAdmin;

    // Default handled by DB or application logic before save
    @Column(name = "exp_at", nullable = false)
    private Timestamp expiresAt;

    @Column(name = "license_code", nullable = false, length = 36) // UUID likely
    private String licenseCode;

    @Column(name = "status", nullable = false)
    private Integer status; // Consider Enum

    // --- Relationships ---
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId // Specifies that the PK (licenseId) is derived from the InvoiceDetail relationship
    @JoinColumn(name = "license_id", foreignKey = @ForeignKey(name = "licenses_invoice_details_FK"))
    private InvoiceDetail invoiceDetail;

    // --- Custom Setter for Bi-directional Relationship & @MapsId ---
    // Override Lombok's setter for invoiceDetail to manage ID mapping
    public void setInvoiceDetail(InvoiceDetail invoiceDetail) {
        this.invoiceDetail = invoiceDetail;
        // If setting invoiceDetail, also set the ID via @MapsId mechanism
        if (invoiceDetail != null) {
            this.licenseId = invoiceDetail.getInvoiceDetailId();
             // Keep the relationship bidirectional if needed
            if (invoiceDetail.getLicense() != this) {
                invoiceDetail.setLicense(this);
            }
        } else {
             this.licenseId = null;
        }
    }

    // No explicit constructors or other getters/setters needed
}