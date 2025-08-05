import InvestmentsApp from '../components/InvestmentsApp';

export default function InvestmentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto p-6">
        <InvestmentsApp />
      </div>
    </div>
  );
}
