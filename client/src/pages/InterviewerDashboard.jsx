import { useState } from "react";
import Availability from "../components/interviewer/Availability";
import RequestsList from "../components/interviewer/RequestsList";
import ConfirmedMeetings from "../components/interviewer/ConfirmedMeetings";
import LogoutButton from "../components/LogoutButton";

export default function InterviewerDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="col-span-2 p-6 border-r">
       
        <RequestsList onConfirmed={() => setRefreshKey(k => k + 1)} />
      </div>

      <div className="p-6">
        <ConfirmedMeetings refreshKey={refreshKey} />
        <LogoutButton />
      </div>
    </div>
  );
}
