/**
 * Vendor Configuration
 * 
 * Configuration for external vendors and platforms.
 */

import type { ReactNode } from 'react';
import { FaAmazon, FaGoodreadsG, FaInstagram, FaTiktok } from 'react-icons/fa';
import { colors } from '../theme/colors';

export type VendorName = 'amazon' | 'goodreads' | 'instagram' | 'tiktok';

export interface VendorConfig {
  name: string;
  displayName: string;
  color: string;
  textColor: string;
  icon: ReactNode;
  urlPattern?: RegExp;
}

export const vendors: Record<VendorName, VendorConfig> = {
  amazon: {
    name: 'amazon',
    displayName: 'Amazon',
    color: colors.vendors.amazon,
    textColor: '#000000',
    icon: FaAmazon({ className: 'text-lg' }),
    urlPattern: /amazon\.com/,
  },
  goodreads: {
    name: 'goodreads',
    displayName: 'Goodreads',
    color: colors.vendors.goodreads,
    textColor: '#FFFFFF',
    icon: FaGoodreadsG({ className: 'text-lg' }),
    urlPattern: /goodreads\.com/,
  },
  instagram: {
    name: 'instagram',
    displayName: 'Instagram',
    color: colors.vendors.instagram,
    textColor: '#FFFFFF',
    icon: FaInstagram({ className: 'text-lg' }),
    urlPattern: /instagram\.com/,
  },
  tiktok: {
    name: 'tiktok',
    displayName: 'TikTok',
    color: colors.vendors.tiktok,
    textColor: '#FFFFFF',
    icon: FaTiktok({ className: 'text-lg' }),
    urlPattern: /tiktok\.com/,
  },
};

/**
 * Detect vendor from URL
 * @param url - The URL to check
 * @returns The vendor name if detected, undefined otherwise
 */
export function detectVendor(url: string): VendorName | undefined {
  for (const [vendorName, config] of Object.entries(vendors)) {
    if (config.urlPattern?.test(url)) {
      return vendorName as VendorName;
    }
  }
  return undefined;
}

/**
 * Get vendor configuration
 * @param vendor - The vendor name
 * @returns The vendor configuration
 */
export function getVendorConfig(vendor: VendorName): VendorConfig {
  return vendors[vendor];
}

/**
 * Format a vendor link label
 * @param vendor - The vendor name
 * @param action - The action (e.g., 'Buy', 'View', 'Follow')
 * @returns Formatted label
 */
export function formatVendorLabel(
  vendor: VendorName,
  action: 'buy' | 'view' | 'follow' | 'check' = 'check'
): string {
  const config = vendors[vendor];
  const actionText = {
    buy: 'Buy on',
    view: 'View on',
    follow: 'Follow on',
    check: 'Check out on',
  };
  
  return `${actionText[action]} ${config.displayName}`;
}
