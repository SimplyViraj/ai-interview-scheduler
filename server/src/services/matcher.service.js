export function matchSlots(candidateSlots, interviewerSlots) {
  const matches = [];

  for (let c of candidateSlots) {
    for (let i of interviewerSlots) {
      const start = new Date(Math.max(c.start, i.start));
      const end = new Date(Math.min(c.end, i.end));

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

  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
