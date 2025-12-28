export function matchSlots(candidateSlots, interviewerSlots) {
  const matches = [];


  for (let c of candidateSlots) {
    for (let i of interviewerSlots) {
      const start = new Date(Math.max(new Date(c.start), new Date(i.start)));
      const end = new Date(Math.min(new Date(c.end), new Date(i.end)));

      if (start < end) {
        const duration = (end - start) / 60000;
        matches.push({
          start,
          end,
          score: duration
        });
      }
    }
  }
  console.log("[MATCHER] candidateSlots:", candidateSlots, "interviewerSlots:", interviewerSlots, "matches:", matches);

  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
