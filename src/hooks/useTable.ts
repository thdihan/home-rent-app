import { useState, useMemo } from 'react';

type SortDirection = 'asc' | 'desc';

export interface UseTableProps<T> {
  data: T[];
  itemsPerPage?: number;
  initialSortKey?: keyof T;
  initialSortDirection?: SortDirection;
}

export function useTable<T extends Record<string, any>>({
  data,
  itemsPerPage = 10,
  initialSortKey = 'createdAt' as keyof T,
  initialSortDirection = 'desc',
}: UseTableProps<T>) {
  const [filterText, setFilterText] = useState('');
  const [sortKey, setSortKey] = useState<keyof T>(initialSortKey);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialSortDirection);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key: any) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const handleFilter = (text: string) => {
    setFilterText(text);
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    if (!filterText) return data;
    const lowerFilter = filterText.toLowerCase();
    return data.filter((item) => {
      return Object.values(item).some((val) => {
        if (val === null || val === undefined) return false;
        if (typeof val === 'object') {
            return Object.values(val).some(nestedVal => 
                nestedVal && String(nestedVal).toLowerCase().includes(lowerFilter)
            );
        }
        return String(val).toLowerCase().includes(lowerFilter);
      });
    });
  }, [data, filterText]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    const getValue = (obj: any, path: string) => {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    return [...filteredData].sort((a, b) => {
      let valA = getValue(a, sortKey as string);
      let valB = getValue(b, sortKey as string);

      if (typeof valA === 'string' && typeof valB === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, validCurrentPage, itemsPerPage]);

  return {
    filterText,
    setFilterText: handleFilter,
    sortKey,
    sortDirection,
    handleSort,
    currentPage: validCurrentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    totalItems: sortedData.length
  };
}
