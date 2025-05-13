import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Helper to generate a date string
const now = () => new Date().toISOString();

// Mock data
export const mockLicenses = [
  {
    id: "1",
    licenseId: "LIC-2023-001",
    enterpriseId: "1",
    enterpriseName: "ABC Corporation",
    serviceId: "1",
    packageId: "1",
    packageName: "Premium Service Package",
    status: "active",
    startDate: "2023-01-01",
    expirationDate: "2023-12-31",
    notes: "Primary license for cloud services",
    createdAt: now(),
    updatedAt: now()
  },
  // ... (Other license entries structured similarly)
];

export const mockServices = [
  {
    id: "1",
    name: "Cloud Storage",
    description: "Secure cloud storage solution for businesses",
    apiEndpoint: "/api/cloud-storage",
    status: "active",
    packageCount: 3,
    createdAt: now(),
    updatedAt: now()
  },
  // ... (Other services)
];

export const mockPackages = [
  {
    id: "1",
    name: "Premium Package",
    serviceId: "1",
    description: "Enterprise-grade cloud storage with advanced features",
    duration: "1 Year",
    price: 999.99,
    activeLicenses: 120,
    createdAt: now(),
    updatedAt: now()
  },
  // ... (Other packages)
];

export const mockEnterprises = [
  {
    id: "1",
    name: "ABC Corporation",
    taxId: "ABC-12345-XYZ",
    email: "contact@abccorp.com",
    phone: "+1-555-123-4567",
    address: "123 Corporate Ave, Business District, NY 10001",
    contactPerson: "John Smith",
    licenseCount: 3,
    createdAt: now(),
    updatedAt: now()
  },
  // ... (Other enterprises)
];

export const mockAdmins = [
  {
    id: "1",
    name: "Admin User",
    username: "admin",
    email: "admin@lmai.com",
    phone: "+1-555-111-0000",
    role: "System Administrator",
    status: "active",
    permissions: ["write", "enterprises", "services", "packages", "admins"],
    createdAt: now(),
    updatedAt: now()
  },
  // ... (Other admins)
];

// Utilities
export function generateLicenseId() {
  const year = new Date().getFullYear();
  const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `LIC-${year}-${randomPart}`;
}

export function getExpirationDate(startDate, duration) {
  const start = new Date(startDate);
  let expiration = new Date(start);

  switch (duration) {
    case "1 Month":
      expiration.setMonth(start.getMonth() + 1);
      break;
    case "3 Months":
      expiration.setMonth(start.getMonth() + 3);
      break;
    case "6 Months":
      expiration.setMonth(start.getMonth() + 6);
      break;
    case "1 Year":
      expiration.setFullYear(start.getFullYear() + 1);
      break;
    case "2 Years":
      expiration.setFullYear(start.getFullYear() + 2);
      break;
    default:
      expiration.setFullYear(start.getFullYear() + 1);
  }

  return format(expiration, "yyyy-MM-dd");
}

export function formatDate(date) {
  return format(new Date(date), "dd MMM yyyy");
}
