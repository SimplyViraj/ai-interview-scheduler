import { useState } from "react";
import InterviewerList from "../components/candidate/InterviewerList";
import AvailabilityList from "../components/candidate/AvailabilityList";
import CandidateMeetings from "../components/candidate/CandidateMeetings";

export default function CandidateDashboard() {
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);

  return (
    <div className="grid grid-cols-3 h-screen">
      {/* LEFT */}
      <div className="col-span-2 p-6 border-r">
        <InterviewerList onSelect={setSelectedInterviewer} />

        {selectedInterviewer && (
          <AvailabilityList
            interviewer={selectedInterviewer}
            onDone={() => setSelectedInterviewer(null)}
          />
        )}
      </div>

      {/* RIGHT */}
      <div className="p-6">
        <CandidateMeetings />
      </div>
    </div>
  );
}
