export function CodeStatsCard({ code }) {
  const lines = code.split('\n').length;
  const chars = code.length;
  const words = code.split(/\s+/).filter(w => w.length > 0).length;
  const hasComments = /\/\/|\/\*|\*\/|#/.test(code);

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20 p-4 rounded-lg border border-blue-500/30 dark:border-blue-500/50">
        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Lines</div>
        <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{lines}</div>
      </div>
      <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 dark:from-purple-500/20 dark:to-purple-600/20 p-4 rounded-lg border border-purple-500/30 dark:border-purple-500/50">
        <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">Characters</div>
        <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{chars}</div>
      </div>
      <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 dark:from-green-500/20 dark:to-green-600/20 p-4 rounded-lg border border-green-500/30 dark:border-green-500/50">
        <div className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">Words</div>
        <div className="text-2xl font-bold text-green-700 dark:text-green-300">{words}</div>
      </div>
      <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 dark:from-orange-500/20 dark:to-orange-600/20 p-4 rounded-lg border border-orange-500/30 dark:border-orange-500/50">
        <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">Comments</div>
        <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">{hasComments ? '✓' : '✗'}</div>
      </div>
    </div>
  );
}
