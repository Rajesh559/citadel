export const getIndicatorColor = (value: number): string => {
  if (value < 30) return 'var(--color-status-primary-error)';
  if (value < 60) return 'var(--color-status-primary-warning-severe)';
  return 'var(--color-status-primary-success)';
};
