interface MondrianGridProps {
  variant?: 'default' | 'hero' | 'section';
  opacity?: number;
  className?: string;
}

// Configuraciones de bloques estilo Mondrian
const gridConfigs = {
  default: [
    { position: 'top-0 left-0', size: 'w-1/3 h-full', color: 'bg-azul-subtle', opacity: 40 },
    { position: 'top-0 right-0', size: 'w-1/4 h-1/2', color: 'bg-lima-subtle', opacity: 50 },
    { position: 'bottom-0 right-0', size: 'w-1/3 h-1/2', color: 'bg-naranja-subtle', opacity: 40 },
    { position: 'bottom-0 left-1/4', size: 'w-1/4 h-1/3', color: 'bg-terracota-subtle', opacity: 30 },
  ],
  hero: [
    { position: 'top-0 left-0', size: 'w-2/5 h-2/3', color: 'bg-azul-subtle', opacity: 50 },
    { position: 'top-0 right-0', size: 'w-1/4 h-1/2', color: 'bg-lima-subtle', opacity: 40 },
    { position: 'bottom-0 left-1/4', size: 'w-1/3 h-1/2', color: 'bg-naranja-subtle', opacity: 50 },
    { position: 'bottom-0 right-0', size: 'w-1/3 h-1/3', color: 'bg-terracota-subtle', opacity: 40 },
    { position: 'top-1/3 right-1/4', size: 'w-1/6 h-1/4', color: 'bg-azul-bg', opacity: 30 },
  ],
  section: [
    { position: 'top-0 left-0', size: 'w-1/3 h-1/2', color: 'bg-azul-subtle', opacity: 60 },
    { position: 'top-0 right-0', size: 'w-1/4 h-2/3', color: 'bg-lima-subtle', opacity: 50 },
    { position: 'bottom-0 left-1/4', size: 'w-1/3 h-1/2', color: 'bg-naranja-subtle', opacity: 50 },
    { position: 'bottom-0 right-0', size: 'w-1/4 h-1/3', color: 'bg-terracota-subtle', opacity: 40 },
  ],
};

export default function MondrianGrid({
  variant = 'default',
  opacity,
  className = ''
}: MondrianGridProps) {
  const blocks = gridConfigs[variant];

  return (
    <div className={`absolute inset-0 ${className}`}>
      {blocks.map((block, index) => (
        <div
          key={index}
          className={`absolute ${block.position} ${block.size} ${block.color}`}
          style={{ opacity: (opacity ?? block.opacity) / 100 }}
        />
      ))}
    </div>
  );
}
