import { useState } from "react";
import Availability from "../components/interviewer/Availability";
import RequestsList from "../components/interviewer/RequestsList";
import ConfirmedMeetings from "../components/interviewer/ConfirmedMeetings";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../auth/useAuth";

export default function InterviewerDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      
      {/* HEADER */}
      <header className="h-16 px-8 flex items-center justify-between">
        <h1 className="text-sm font-medium tracking-wide">
          Interviewer Dashboard
        </h1>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm">{user?.name || "Interviewer"}</p>
            <p className="text-xs text-neutral-400">
              {user?.email || "interviewer@email.com"}
            </p>
          </div>
          <LogoutButton />
        </div>
      </header>

      {/* SOFT DIVIDER */}
      <div className="h-px bg-white/5" />

      {/* MAIN */}
      <main className="flex flex-1 overflow-hidden">
        
        {/* LEFT PANEL */}
        <section className="flex-1 p-8 overflow-y-auto">
          <p className="text-xs uppercase tracking-wider text-neutral-500 mb-6">
            Incoming Requests
          </p>

          <div className="bg-neutral-900/80 rounded-xl p-6 shadow-sm">
            <RequestsList onConfirmed={() => setRefreshKey(k => k + 1)} />
          </div>
        </section>

        {/* RIGHT PANEL */}
        <aside className="w-[380px] p-8">
          <p className="text-xs uppercase tracking-wider text-neutral-500 mb-6">
            Confirmed Meetings
          </p>

          <div className="bg-neutral-900/80 rounded-xl p-6 shadow-sm h-full">
            <ConfirmedMeetings refreshKey={refreshKey} />
          </div>
        </aside>
      </main>
    </div>
  );
}
