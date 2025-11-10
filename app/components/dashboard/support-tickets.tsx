interface SupportTicketsProps {
  support_tickets: number;
}

const SupportTickets: React.FC<SupportTicketsProps> = ({ support_tickets = 0 }) => (
  <div className="flex h-32 w-full items-center justify-center">
    <div className="text-5xl font-bold">{support_tickets}</div>
  </div>
);

export default SupportTickets;
