"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table"
import { useReactTable } from "@tanstack/react-table"
import { useState, useEffect, useMemo } from "react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  pageSize?: number
}

// TanStack Table 기반의 재사용 가능한 DataTable
// 정렬, 필터링, 페이지네이션 기능 포함
export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize })
  const [searchValue, setSearchValue] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // React Compiler와 호환되는 네이티브 debounce (useDebounceValue 대체)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchValue), 300)
    return () => clearTimeout(timer)
  }, [searchValue])

  // useMemo로 배열 참조 안정화 — 매 렌더마다 새 객체 생성 방지
  const computedColumnFilters = useMemo(
    () => searchKey ? [{ id: searchKey, value: debouncedSearch }] : columnFilters,
    [searchKey, debouncedSearch, columnFilters]
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    ...(searchKey ? {} : { onColumnFiltersChange: setColumnFilters }),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters: computedColumnFilters,
      pagination,
    },
  })

  const rows = table.getRowModel().rows

  return (
    <div className="space-y-4">
      {searchKey && (
        <Input
          placeholder={`${searchKey}로 검색...`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="max-w-sm"
        />
      )}

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <button
                        onClick={() =>
                          header.column.toggleSorting(
                            header.column.getIsSorted() === "asc"
                          )
                        }
                        className="inline-flex items-center gap-2 font-medium hover:text-foreground"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() && (
                          <span className="text-xs">
                            {header.column.getIsSorted() === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </button>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <EmptyState
                    title="데이터가 없습니다"
                    description="표시할 항목이 없습니다"
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {(() => {
            const totalFiltered = table.getFilteredRowModel().rows.length
            const pageIndex = table.getState().pagination.pageIndex
            if (totalFiltered === 0) return "총 0개"
            return `${pageIndex * pageSize + 1} ~ ${Math.min((pageIndex + 1) * pageSize, totalFiltered)} / 총 ${totalFiltered}개`
          })()}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                이전
              </Button>
            </PaginationItem>

            {(() => {
              const currentPage = table.getState().pagination.pageIndex
              const pageCount = table.getPageCount()
              const pages: (number | "ellipsis")[] = []

              for (let i = 0; i < pageCount; i++) {
                if (
                  i === 0 ||
                  i === pageCount - 1 ||
                  (i >= currentPage - 1 && i <= currentPage + 1)
                ) {
                  pages.push(i)
                } else if (
                  pages[pages.length - 1] !== "ellipsis"
                ) {
                  pages.push("ellipsis")
                }
              }

              return pages.map((page, idx) =>
                page === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => table.setPageIndex(page)}
                      href="#"
                    >
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )
            })()}

            <PaginationItem>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                다음
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
