import { Incident } from "@/app/types/types";
import { ColumnDef } from "@tanstack/react-table";
import SeverityBadge from "../shared/SeverityBadge";
import StatusBadge from "../shared/StatusBagde";
import { formatDate } from "@/lib/formatDate"

export const incidentColumns : ColumnDef<Incident>[] = [
  {
    accessorKey: "title",
    header: "INCIDENT NAME",
    cell: ({ row }) => (
      <div className="flex flex-col px-4 py-2 gap-1">
        <span className="font-bold text-base text-slate-900 dark:text-slate-200 ">
          {row.original.title}
        </span>
        <span className="font-semibold text-slate-900 dark:text-slate-200 ">
          {row.original.incidentCode}
        </span>
      </div>
    )
  },
  {
    accessorKey: "priority",
    header: "PRIORITY",
    cell: ({ row }) => <SeverityBadge level={row.original.priority} />,
    sortingFn: (rowA, rowB) => {
      const order = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
      return order[rowA.original.priority] - order[rowB.original.priority];
    }
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => <StatusBadge status={row.original.status} />
  },
  {
    accessorKey: "createdAt",
    header: "CREATED ON",
    cell: ({ row }) => formatDate(row.original.createdAt)
  },
];


export const collapsedIncidentColumns: ColumnDef<Incident>[] = [
  {
    accessorKey: "title",
    header: "INCIDENT",
    cell: ({ row }) => (
      <div className="flex flex-col px-4 py-2 ml-2 gap-0.5">
        <span className="font-bold text-base truncate text-slate-900 dark:text-slate-200 mb-2">
          {row.original.title}
        </span>
        <span className="font-semibold text-xs text-slate-900 dark:text-slate-200 ">
          {row.original.incidentCode}
        </span>
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "CREATED ON",
    cell: ({ row }) => (
      <span className="font-semibold text-slate-900 dark:text-slate-200 p-2 mr-4">
        {formatDate(row.original.createdAt)}
      </span>
    )
  }
]