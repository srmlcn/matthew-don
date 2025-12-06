/**
 * Configuration
 *
 * Centralized export for all site configuration.
 *
 * @example
 * import { siteConfig, mainNav, vendors } from '@/lib/config';
 */

export { siteConfig, type SiteConfig } from "./site"
export {
  mainNav,
  booksNav,
  footerNav,
  socialNav,
  type NavItem,
  type NavSection,
} from "./navigation"
export {
  vendors,
  detectVendor,
  getVendorConfig,
  formatVendorLabel,
  type VendorName,
  type VendorConfig,
} from "./vendors"
