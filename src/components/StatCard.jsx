function StatCard({ label, value }) {
  return (
    <div className="bg-blue-400 dark:bg-white/20 rounded-xl p-3 flex flex-col gap-1">
      <span className="text-xs dark:text-white uppercase tracking-wide">{label}</span>
      <span className="text-base font-medium dark:text-white">{value}</span>
    </div>
  );
}

export default StatCard;