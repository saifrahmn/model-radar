export default function LiveBadge() {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '4px 10px',
        background: 'rgba(76,175,130,0.1)',
        border: '1px solid rgba(76,175,130,0.2)',
        borderRadius: 20,
      }}
    >
      <div className="pulse-dot" />
      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--green)', letterSpacing: '0.08em' }}>
        LIVE
      </span>
    </div>
  );
}
