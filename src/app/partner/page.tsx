import { requireAuth } from "@/app/middleware/auth";

export default async function PartnerDashboard() {
  // Authentication should be handled in middleware or API routes, not in a React Server Component.
  // Remove the requireAuth call here and ensure your middleware protects this route.

  return (
    <div>
      <h1>Partner Dashboard</h1>
      <p>Welcome, Partner!</p>
    </div>
  );
}
