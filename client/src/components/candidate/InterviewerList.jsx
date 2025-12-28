import { useEffect, useState } from "react";
import api from "../../api/api";
import { User, ChevronRight } from "lucide-react";

export default function InterviewerList({ onSelect }) {
  const [interviewers, setInterviewers] = useState([]);

  useEffect(() => {
    api.get("/users?role=interviewer").then((res) => {
      setInterviewers(res.data);
    });
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-neutral-300 tracking-wide">
        Available Interviewers
      </h3>

      <div className="space-y-2">
        {interviewers.map((i) => (
          <button
            key={i._id}
            onClick={() => onSelect(i)}
            className="
              group w-full flex items-center gap-4
              rounded-xl px-4 py-3
              bg-neutral-900/80
              border border-neutral-800
              hover:bg-grey-800/70
              transition-colors duration-200
            "
          >
            {/* Avatar */}
            <div
              className="
                w-10 h-10 rounded-full
                bg-neutral-800
                flex items-center justify-center
                flex-shrink-0
              "
            >
              <User className="w-5 h-5 text-neutral-400" />
            </div>

            {/* Info */}
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-neutral-200">
                {i.name}
              </p>
              <p className="text-xs text-neutral-500">
                {i.email}
              </p>
            </div>

            {/* Action */}
            <div className="flex items-center gap-2 text-neutral-500 group-hover:text-neutral-300 transition-colors">
              <span className="text-xs font-medium">Request</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
