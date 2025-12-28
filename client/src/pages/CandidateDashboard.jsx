import { useState } from "react";
import InterviewerList from "../components/candidate/InterviewerList";
import AvailabilityList from "../components/candidate/AvailabilityList";
import CandidateMeetings from "../components/candidate/CandidateMeetings";
import LogoutButton from "../components/LogoutButton";

export default function CandidateDashboard() {
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="grid grid-cols-3 h-screen">
      {/* LEFT */}
      <div className="col-span-2 p-6 border-r">
        <InterviewerList onSelect={setSelectedInterviewer} />

        {selectedInterviewer && (
          <AvailabilityList
            interviewer={selectedInterviewer}
            onDone={() => {
              setSelectedInterviewer(null);
              setRefreshKey((k) => k + 1);
            }}
          />
        )}
      </div>

      {/* RIGHT */}
      <div className="p-6">
        <CandidateMeetings refreshKey={refreshKey} />
        <LogoutButton />
      </div>
    </div>
  );
}
