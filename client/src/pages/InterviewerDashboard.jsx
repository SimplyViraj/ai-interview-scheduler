import Availability from "../components/interviewer/Availability";
import RequestsList from "../components/interviewer/RequestsList";

export default function InterviewerDashboard() {
  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="col-span-2 p-6 border-r">
        <Availability />
        <RequestsList />
      </div>
      <div className="p-6">
        <h3 className="font-bold mb-4">Confirmed Meetings</h3>
      </div>
    </div>
  );
}
