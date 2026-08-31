'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  isScrolled?: boolean;
}

export function MobileMenu({ isOpen, onClose, pathname, isScrolled = false }: MobileMenuProps) {
  if (!isOpen) return null;

  const links = [
    { label: 'Beranda', href: '/' },
    { label: 'Periksa Pesan / WA', href: '/analyze' },
    { label: 'Cara Kerja', href: '/how-it-works' },
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Kebijakan Privasi', href: '/privacy' },
    { label: 'Ketentuan Layanan', href: '/terms' },
  ];

  return (
    <div
      className={cn(
        'pointer-events-auto md:hidden fixed z-50 bg-white border border-border shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-top-2',
        isScrolled
          ? 'top-20 inset-x-4 max-w-md mx-auto rounded-3xl p-5'
          : 'top-16 inset-x-0 border-b p-5'
      )}
    >
      <div className="space-y-3">
        <nav className="flex flex-col space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-background-muted text-foreground font-semibold'
                    : 'text-foreground-secondary hover:bg-background-subtle hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="pt-3 border-t border-border">
          <Link href="/analyze" onClick={onClose} className="block w-full">
            <Button variant="primary" size="md" className="w-full justify-center rounded-xl">
              Periksa Pesan Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
