import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
  PaginationState,
  getSortedRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'

import { useState } from 'react';

interface BasicTableProps <T> {
  data: T[],
  columns: ColumnDef<T>[],
  page: number;
  setPage: (page: number) => void,
  totalPages: number
  onRowClick:  (row: T) => void
  selectedId? : string | null
}

interface WithId {
  incidentId?: string
}


function BasicTable <T extends WithId>({ 
  data, 
  columns,
  page,
  setPage,
  totalPages,
  onRowClick,
  selectedId
} : BasicTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      pagination
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination
  });

  console.log(data.length)

  if(!data.length) return <div>No data found</div>

  return(
    <div className="bg-slate-100/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-800 overflow-hidden rounded-sm shadow-sm" >
      <table className='w-full border-collapse'>
        <thead >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr 
              key={headerGroup.id}
              
              className='
                bg-slate-200/50 dark:bg-slate-800/40
              '
            >
              {headerGroup.headers.map((header) => (
                <th 
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className='
                    text-start text-xs ml-4
                    px-4 py-4 border-b
                    font-mono font-bold
                    dark:text-slate-500 text-slate-600
                    uppercase tracking-widest
                    border-slate-200 dark:border-slate-700
                  '
                >
                  {header.isPlaceholder 
                    ? null 
                    : flexRender (
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  {header.column.getIsSorted() === "asc" ? " ↑"
                    : header.column.getIsSorted() === "desc" ? " ↓"
                    : ""
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='divide-y divide-slate-200 dark:divide-slate-800'>
            {table.getRowModel().rows.map((row) => (
              <tr 
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                className={`
                  transition-colors border-l-2 cursor-pointer
                  ${row.original.incidentId === selectedId
                    ? 'border-l-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20'
                    : 'border-l-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800/30'
                  }  
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <td 
                    key={cell.id}
                    className='
                      px-2 py-2
                      text-sm
                    '
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      

      <div className='flex justify-end gap-2 p-4'>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className='border rounded-sm px-2 py-1 disabled:opacity-40'
        >
          {"<"}
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className='border rounded-sm px-2 py-1 disabled:opacity-40'
        >
          {">"}
        </button>
      </div>
    </div>
  )
}

export default BasicTable;