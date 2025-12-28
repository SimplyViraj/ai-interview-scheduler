import { useState } from "react";
import InterviewerList from "../components/candidate/InterviewerList";
import AvailabilityList from "../components/candidate/AvailabilityList";
import CandidateMeetings from "../components/candidate/CandidateMeetings";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../auth/useAuth";

export default function CandidateDashboard() {
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      
      {/* HEADER */}
      <header className="h-16 px-8 flex items-center justify-between bg-neutral-950">
        <h1 className="text-lg font-medium tracking-wide">
         Candidate Dashboard
        </h1>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm">{user?.name || "Candidate"}</p>
            <p className="text-xs text-neutral-400">
              {user?.email || "candidate@email.com"}
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
          <p className="text-xs uppercase tracking-wider text-grey/700 mb-6">
            Interviewers
          </p>

          <div className="bg-neutral-900/80 rounded-xl p-6 shadow-sm">
            <InterviewerList onSelect={setSelectedInterviewer} />

            {selectedInterviewer && (
              <div className="mt-6 pt-6 border-t border-neutral-800">
                <AvailabilityList
                  interviewer={selectedInterviewer}
                  onDone={() => {
                    setSelectedInterviewer(null);
                    setRefreshKey((k) => k + 1);
                  }}
                />
              </div>
            )}
          </div>
        </section>

        {/* RIGHT PANEL */}
        <aside className="w-[380px] p-8">
          <p className="text-xs uppercase tracking-wider text-grey/700 mb-6">
            My Meetings
          </p>

          <div className="bg-neutral-900/80 rounded-xl p-6 shadow-sm h-full">
            <CandidateMeetings refreshKey={refreshKey} />
          </div>
        </aside>
      </main>
    </div>
  );
}
