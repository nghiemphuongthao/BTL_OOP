import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]-7 [&>svg+div]-y-[-3px] [&>svg]&>svg]-4 [&>svg]-4 [&>svg]-foreground",
  {
    variants: {
      bg: {
        background: "bg-background",
        destructive: "bg-destructive", // Adding a bg variant for destructive background
      },
      text: {
        foreground: "text-foreground",
        destructive: "text-destructive", // Adding a text variant for destructive text color
      },
    },
    defaultVariants: {
      bg: "background",
      text: "foreground",
    },
  }
);

const Alert = (({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = (({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = (({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
