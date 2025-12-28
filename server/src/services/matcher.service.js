export function matchSlots(candidateSlots, interviewerSlots) {
  const matches = [];
  const SLOT_MS = 60 * 60 * 1000; // 1 hour

  console.log("=== MATCHER INPUT ===");

  candidateSlots.forEach(s =>
    console.log("Candidate:", s.start.toISOString(), "→", s.end.toISOString())
  );

  interviewerSlots.forEach(s =>
    console.log("Interviewer:", s.start.toISOString(), "→", s.end.toISOString())
  );

  for (const c of candidateSlots) {
    for (const i of interviewerSlots) {
      const overlapStart = new Date(
        Math.max(new Date(c.start), new Date(i.start))
      );
      const overlapEnd = new Date(
        Math.min(new Date(c.end), new Date(i.end))
      );

      if (overlapStart >= overlapEnd) continue;

      let cursor = new Date(overlapStart);

      while (cursor.getTime() + SLOT_MS <= overlapEnd.getTime()) {
        matches.push({
          start: new Date(cursor),
          end: new Date(cursor.getTime() + SLOT_MS),
          score: 60 // minutes
        });

        cursor = new Date(cursor.getTime() + SLOT_MS);
      }
    }
  }

  console.log("[MATCHER OUTPUT]", matches);

  return matches.slice(0, 3);
}
