package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false, exclude = {"invoice", "licensePackage", "license"})
@ToString(exclude = {"invoice", "licensePackage", "license"})
@Entity
@Table(name = "invoice_details")
public class InvoiceDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_detail_id")
    private Integer invoiceDetailId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", nullable = false, foreignKey = @ForeignKey(name = "invoice_details_invoices_FK"))
    private Invoice invoice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "license_package_id", nullable = false, foreignKey = @ForeignKey(name = "invoice_details_license_packages_FK"))
    private LicensePackage licensePackage;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    // --- Relationships ---
    // MappedBy in the License entity points back here for the OneToOne
    @OneToOne(mappedBy = "invoiceDetail", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private License license;

    // No explicit constructors, getters, setters needed (except potentially custom setter for license if needed)
    // Example of custom bidirectional setting if needed (overrides Lombok setter):
     public void setLicense(License license) {
        this.license = license;
         // Keep the relationship bidirectional if needed
         if (license != null && license.getInvoiceDetail() != this) {
            license.setInvoiceDetail(this);
        }
    }
}