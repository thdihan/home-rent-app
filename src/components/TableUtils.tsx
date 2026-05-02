import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export function TablePagination({ currentPage, totalPages, setCurrentPage }: TablePaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 mt-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} variant="outline" size="sm">Previous</Button>
        <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} variant="outline" size="sm">Next</Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Page <span className="text-slate-900">{currentPage}</span> of <span className="text-slate-900">{totalPages}</span></p>
        </div>
        <div className="flex gap-2">
            <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} variant="outline" size="sm" className="h-8">
              <ChevronLeft className="h-4 w-4 mr-1" /> Prev
            </Button>
            <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} variant="outline" size="sm" className="h-8">
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
        </div>
      </div>
    </div>
  );
}

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentSortKey: string;
  currentSortDirection: 'asc' | 'desc';
  onSort: (key: string) => void;
  className?: string;
}

export function SortableHeader({ label, sortKey, currentSortKey, currentSortDirection, onSort, className }: SortableHeaderProps) {
  const isActive = sortKey === currentSortKey;
  return (
    <th className={`px-4 py-4 cursor-pointer hover:bg-slate-100 transition-colors ${className || ''}`} onClick={() => onSort(sortKey)}>
      <div className="flex items-center gap-1.5">
        {label}
        {isActive ? (
          currentSortDirection === 'asc' ? <ArrowUp className="w-3 h-3 text-brand-600" /> : <ArrowDown className="w-3 h-3 text-brand-600" />
        ) : (
          <ArrowUpDown className="w-3 h-3 text-slate-300" />
        )}
      </div>
    </th>
  );
}
