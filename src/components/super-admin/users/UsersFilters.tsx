type UsersFiltersProps = {
  search: string;
  roleFilter: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onClearFilters: () => void;
};

export default function UsersFilters({
  search,
  roleFilter,
  statusFilter,
  onSearchChange,
  onRoleFilterChange,
  onStatusFilterChange,
  onClearFilters,
}: UsersFiltersProps) {
  return (
    <div className="grid shrink-0 grid-cols-2 gap-2 border-b border-gray-200 p-2 dark:border-[#1F2A44] md:grid-cols-4">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search user..."
        className="h-8 rounded-lg border border-gray-200 bg-white px-2 text-[11px] text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 dark:border-[#1F2A44] dark:bg-[#0F172A] dark:text-white"
      />

      <select
        value={roleFilter}
        onChange={(e) => onRoleFilterChange(e.target.value)}
        className="h-8 rounded-lg border border-gray-200 bg-white px-2 text-[11px] text-gray-700 outline-none transition focus:border-blue-500 dark:border-[#1F2A44] dark:bg-[#0F172A] dark:text-white"
      >
        <option>All Roles</option>
        <option>Company Admin</option>
        <option>Operator</option>
        <option>Mechanic</option>
      </select>

      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        className="h-8 rounded-lg border border-gray-200 bg-white px-2 text-[11px] text-gray-700 outline-none transition focus:border-blue-500 dark:border-[#1F2A44] dark:bg-[#0F172A] dark:text-white"
      >
        <option>All Status</option>
        <option>Active</option>
        <option>Inactive</option>
        <option>Pending</option>
      </select>

      <button
        onClick={onClearFilters}
        className="h-8 rounded-lg border border-gray-200 px-2 text-[11px] font-medium text-gray-600 transition hover:bg-gray-50 dark:border-[#1F2A44] dark:text-slate-300 dark:hover:bg-blue-500/10"
      >
        Clear
      </button>
    </div>
  );
}