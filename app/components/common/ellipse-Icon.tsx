interface EllipseIconProps {
  size?: 'small' | 'medium' | 'large';
  color: keyof typeof colors;
  shape?: 'circle' | 'square';
}

const colors = {
  'status-primary-success': 'var(--color-status-primary-success)',
  'border-status-warning-potential-risk': 'var(--color-border-status-warning-potential-risk)',
  'status-primary-warning-severe': 'var(--color-status-primary-warning-severe)',
  'status-primary-error': 'var(--color-status-primary-error)',
};

const EllipseIcon: React.FC<EllipseIconProps> = ({ size = 'small', color, shape = 'circle' }) => {
  let diameter = 12;
  if (size === 'small') diameter = 8;
  if (size === 'medium') diameter = 12;
  if (size === 'large') diameter = 16;

  const fillColor = colors[color];

  return (
    <svg
      width={`${diameter}px`}
      height={`${diameter}px`}
      viewBox={`0 0 ${diameter} ${diameter}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {shape === 'circle' && (
        <ellipse cx={diameter / 2} cy={diameter / 2} rx={diameter / 2} ry={diameter / 2} fill={fillColor} />
      )}
      {shape === 'square' && <rect x={0} y={0} width={diameter} height={diameter} fill={fillColor} rx={2} />}
    </svg>
  );
};

export default EllipseIcon;
