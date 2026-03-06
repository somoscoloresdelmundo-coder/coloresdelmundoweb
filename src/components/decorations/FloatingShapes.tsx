interface FloatingShapesProps {
  variant?: 'corners' | 'scattered' | 'hero' | 'minimal';
  opacity?: number;
  className?: string;
}

// Configuraciones predefinidas de formas flotantes
const shapeConfigs = {
  corners: [
    { position: 'top-20 right-20', size: 'w-72 h-72', color: 'bg-azul-subtle', opacity: 60 },
    { position: 'bottom-10 left-10', size: 'w-64 h-64', color: 'bg-lima-subtle', opacity: 60 },
    { position: 'top-40 left-1/4', size: 'w-48 h-48', color: 'bg-naranja-subtle', opacity: 40 },
    { position: 'bottom-20 right-1/4', size: 'w-56 h-56', color: 'bg-terracota-subtle', opacity: 30 },
  ],
  scattered: [
    { position: 'top-16 right-16', size: 'w-64 h-64', color: 'bg-naranja-subtle', opacity: 50 },
    { position: 'bottom-8 left-8', size: 'w-56 h-56', color: 'bg-lima-subtle', opacity: 50 },
    { position: 'top-28 left-1/3', size: 'w-44 h-44', color: 'bg-azul-subtle', opacity: 30 },
    { position: 'bottom-16 right-1/4', size: 'w-48 h-48', color: 'bg-terracota-subtle', opacity: 30 },
  ],
  hero: [
    { position: 'top-20 right-16', size: 'w-64 h-64', color: 'bg-azul-subtle', opacity: 50 },
    { position: 'bottom-10 left-10', size: 'w-56 h-56', color: 'bg-lima-subtle', opacity: 50 },
    { position: 'top-32 left-1/3', size: 'w-48 h-48', color: 'bg-naranja-subtle', opacity: 30 },
    { position: 'bottom-16 right-1/4', size: 'w-40 h-40', color: 'bg-terracota-subtle', opacity: 30 },
  ],
  minimal: [
    { position: 'top-20 right-20', size: 'w-64 h-64', color: 'bg-azul-subtle', opacity: 40 },
    { position: 'bottom-10 left-10', size: 'w-56 h-56', color: 'bg-lima-subtle', opacity: 40 },
  ],
};

export default function FloatingShapes({
  variant = 'corners',
  opacity,
  className = ''
}: FloatingShapesProps) {
  const shapes = shapeConfigs[variant];

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {shapes.map((shape, index) => (
        <div
          key={index}
          className={`absolute ${shape.position} ${shape.size} ${shape.color} rounded-full blur-3xl`}
          style={{ opacity: (opacity ?? shape.opacity) / 100 }}
        />
      ))}
    </div>
  );
}
