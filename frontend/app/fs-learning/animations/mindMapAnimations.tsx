// Module-Specific Mind-Map Animations for all 25 modules

export const renderMindMapAnimation = (animationType: string) => {
  const configs: Record<string, any> = {
    // MongoDB Animations
    'mongodb-intro': {
      center: 'Setup',
      centerColor: '#10b981',
      branches: [
        { text: 'Install', x: 280, y: 130, color: '#10b981' },
        { text: 'Atlas', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Verify', x: 280, y: 470, color: '#8b5cf6' },
        { text: 'Connect', x: 720, y: 470, color: '#f59e0b' }
      ]
    },
    'crud': {
      center: 'CRUD',
      centerColor: '#10b981',
      branches: [
        { text: 'Create', x: 280, y: 130, color: '#10b981' },
        { text: 'Read', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Update', x: 280, y: 470, color: '#8b5cf6' },
        { text: 'Delete', x: 720, y: 470, color: '#f59e0b' }
      ]
    },
    'indexing': {
      center: 'Index',
      centerColor: '#10b981',
      branches: [
        { text: 'Single', x: 280, y: 130, color: '#10b981' },
        { text: 'Compound', x: 720, y: 130, color: '#06b6d4' },
        { text: 'TTL', x: 280, y: 470, color: '#8b5cf6' },
        { text: 'Text', x: 720, y: 470, color: '#f59e0b' }
      ]
    },
    'pipeline': {
      center: 'Pipeline',
      centerColor: '#10b981',
      branches: [
        { text: '$match', x: 280, y: 130, color: '#10b981' },
        { text: '$group', x: 720, y: 130, color: '#06b6d4' },
        { text: '$sort', x: 280, y: 470, color: '#8b5cf6' },
        { text: '$project', x: 720, y: 470, color: '#f59e0b' }
      ]
    },
    'replication': {
      center: 'Replica',
      centerColor: '#10b981',
      branches: [
        { text: 'Primary', x: 280, y: 130, color: '#10b981' },
        { text: 'Secondary', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Arbiter', x: 280, y: 470, color: '#8b5cf6' },
        { text: 'Sync', x: 720, y: 470, color: '#f59e0b' }
      ]
    },

    // Express Animations
    'express-setup': {
      center: 'Express',
      centerColor: '#f59e0b',
      branches: [
        { text: 'Install', x: 280, y: 130, color: '#f59e0b' },
        { text: 'Setup', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Config', x: 280, y: 470, color: '#10b981' },
        { text: 'Start', x: 720, y: 470, color: '#8b5cf6' }
      ]
    },
    'routing': {
      center: 'Routes',
      centerColor: '#f59e0b',
      branches: [
        { text: 'GET', x: 280, y: 130, color: '#f59e0b' },
        { text: 'POST', x: 720, y: 130, color: '#06b6d4' },
        { text: 'PUT', x: 280, y: 470, color: '#10b981' },
        { text: 'DELETE', x: 720, y: 470, color: '#8b5cf6' }
      ]
    },
    'middleware-chain': {
      center: 'Chain',
      centerColor: '#f59e0b',
      branches: [
        { text: 'Auth', x: 280, y: 130, color: '#f59e0b' },
        { text: 'Logging', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Parsing', x: 280, y: 470, color: '#10b981' },
        { text: 'Valid', x: 720, y: 470, color: '#8b5cf6' }
      ]
    },
    'error-flow': {
      center: 'Errors',
      centerColor: '#f59e0b',
      branches: [
        { text: '404', x: 280, y: 130, color: '#f59e0b' },
        { text: '500', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Handle', x: 280, y: 470, color: '#10b981' },
        { text: 'Recover', x: 720, y: 470, color: '#8b5cf6' }
      ]
    },
    'mvc': {
      center: 'MVC',
      centerColor: '#f59e0b',
      branches: [
        { text: 'Model', x: 280, y: 130, color: '#f59e0b' },
        { text: 'View', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Control', x: 280, y: 470, color: '#10b981' },
        { text: 'Routes', x: 720, y: 470, color: '#8b5cf6' }
      ]
    },

    // Node.js Animations
    'nodejs-runtime': {
      center: 'Runtime',
      centerColor: '#6ee7b7',
      branches: [
        { text: 'V8', x: 280, y: 130, color: '#6ee7b7' },
        { text: 'Libuv', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Loop', x: 280, y: 470, color: '#10b981' },
        { text: 'Async', x: 720, y: 470, color: '#8b5cf6' }
      ]
    },
    'async-flow': {
      center: 'Async',
      centerColor: '#6ee7b7',
      branches: [
        { text: 'Callback', x: 280, y: 130, color: '#6ee7b7' },
        { text: 'Promise', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Async/Await', x: 280, y: 470, color: '#10b981' },
        { text: 'Error', x: 720, y: 470, color: '#8b5cf6' }
      ]
    },
    'file-io': {
      center: 'FileIO',
      centerColor: '#6ee7b7',
      branches: [
        { text: 'Read', x: 280, y: 130, color: '#6ee7b7' },
        { text: 'Write', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Stream', x: 280, y: 470, color: '#10b981' },
        { text: 'Sync', x: 720, y: 470, color: '#8b5cf6' }
      ]
    },
    'streams': {
      center: 'Streams',
      centerColor: '#6ee7b7',
      branches: [
        { text: 'Read', x: 280, y: 130, color: '#6ee7b7' },
        { text: 'Write', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Transform', x: 280, y: 470, color: '#10b981' },
        { text: 'Duplex', x: 720, y: 470, color: '#8b5cf6' }
      ]
    },
    'performance': {
      center: 'Perf',
      centerColor: '#6ee7b7',
      branches: [
        { text: 'Profile', x: 280, y: 130, color: '#6ee7b7' },
        { text: 'Optimize', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Cluster', x: 280, y: 470, color: '#10b981' },
        { text: 'Cache', x: 720, y: 470, color: '#8b5cf6' }
      ]
    },

    // React Animations
    'jsx-structure': {
      center: 'JSX',
      centerColor: '#8b5cf6',
      branches: [
        { text: 'Element', x: 280, y: 130, color: '#8b5cf6' },
        { text: 'Component', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Props', x: 280, y: 470, color: '#10b981' },
        { text: 'Children', x: 720, y: 470, color: '#f59e0b' }
      ]
    },
    'hooks-state': {
      center: 'Hooks',
      centerColor: '#8b5cf6',
      branches: [
        { text: 'useState', x: 280, y: 130, color: '#8b5cf6' },
        { text: 'useEffect', x: 720, y: 130, color: '#06b6d4' },
        { text: 'useContext', x: 280, y: 470, color: '#10b981' },
        { text: 'Custom', x: 720, y: 470, color: '#f59e0b' }
      ]
    },
    'effect-lifecycle': {
      center: 'Life',
      centerColor: '#8b5cf6',
      branches: [
        { text: 'Mount', x: 280, y: 130, color: '#8b5cf6' },
        { text: 'Update', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Unmount', x: 280, y: 470, color: '#10b981' },
        { text: 'Cleanup', x: 720, y: 470, color: '#f59e0b' }
      ]
    },
    'context-flow': {
      center: 'Context',
      centerColor: '#8b5cf6',
      branches: [
        { text: 'Provider', x: 280, y: 130, color: '#8b5cf6' },
        { text: 'Consumer', x: 720, y: 130, color: '#06b6d4' },
        { text: 'useContext', x: 280, y: 470, color: '#10b981' },
        { text: 'Share', x: 720, y: 470, color: '#f59e0b' }
      ]
    },
    'optimization': {
      center: 'Optimize',
      centerColor: '#8b5cf6',
      branches: [
        { text: 'Memo', x: 280, y: 130, color: '#8b5cf6' },
        { text: 'useMemo', x: 720, y: 130, color: '#06b6d4' },
        { text: 'useCallback', x: 280, y: 470, color: '#10b981' },
        { text: 'Lazy', x: 720, y: 470, color: '#f59e0b' }
      ]
    },

    // Angular Animations
    'ng-structure': {
      center: 'Angular',
      centerColor: '#f97316',
      branches: [
        { text: 'Install', x: 280, y: 130, color: '#f97316' },
        { text: 'CLI', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Setup', x: 280, y: 470, color: '#10b981' },
        { text: 'Module', x: 720, y: 470, color: '#8b5cf6' }
      ]
    },
    'binding-flow': {
      center: 'Template',
      centerColor: '#f97316',
      branches: [
        { text: 'Binding', x: 280, y: 130, color: '#f97316' },
        { text: 'Directive', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Event', x: 280, y: 470, color: '#10b981' },
        { text: 'Form', x: 720, y: 470, color: '#8b5cf6' }
      ]
    },
    'dependency-inject': {
      center: 'Service',
      centerColor: '#f97316',
      branches: [
        { text: 'Injectable', x: 280, y: 130, color: '#f97316' },
        { text: 'DI', x: 720, y: 130, color: '#06b6d4' },
        { text: 'HTTP', x: 280, y: 470, color: '#10b981' },
        { text: 'Singleton', x: 720, y: 470, color: '#8b5cf6' }
      ]
    },
    'ng-routing': {
      center: 'Route',
      centerColor: '#f97316',
      branches: [
        { text: 'Navigate', x: 280, y: 130, color: '#f97316' },
        { text: 'Guard', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Params', x: 280, y: 470, color: '#10b981' },
        { text: 'Lazy', x: 720, y: 470, color: '#8b5cf6' }
      ]
    },
    'rxjs-flow': {
      center: 'RxJS',
      centerColor: '#f97316',
      branches: [
        { text: 'Observable', x: 280, y: 130, color: '#f97316' },
        { text: 'Subject', x: 720, y: 130, color: '#06b6d4' },
        { text: 'Operator', x: 280, y: 470, color: '#10b981' },
        { text: 'Subscribe', x: 720, y: 470, color: '#8b5cf6' }
      ]
    }
  };

  const config = configs[animationType];
  if (!config) return null;

  return (
    <>
      {/* Center Node */}
      <circle cx="500" cy="300" r="45" fill={config.centerColor} fillOpacity="0.8" stroke={config.centerColor} strokeWidth="2" filter="url(#mindmapGlow)"/>
      <text x="500" y="310" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{config.center}</text>

      {/* Branches */}
      {config.branches.map((branch: any, idx: number) => (
        <g key={idx}>
          <line x1="500" y1="300" x2={branch.x} y2={branch.y} stroke={branch.color} strokeWidth="2.5" opacity="0.7"/>
          <circle cx={branch.x} cy={branch.y} r="30" fill={branch.color} fillOpacity="0.4" stroke={branch.color} strokeWidth="2"/>
          <text x={branch.x} y={branch.y + 8} textAnchor="middle" fill={branch.color} fontSize="12" fontWeight="bold">{branch.text}</text>
        </g>
      ))}

      {/* Title */}
      <text x="500" y="670" textAnchor="middle" fill={config.centerColor} fontSize="16" fontWeight="bold">{config.center} Architecture</text>
    </>
  );
};
