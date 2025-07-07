"use client";

import { useState } from "react";

const QUOTES = [
  { text: "Kill the boy, Jon Snow. Winter is almost upon us. Kill the boy and let the man be born.", author: "Maester Aemon", topics: ["growth", "winter", "transformation"] },
  { text: "Let me tell you something, boy. Never forget what you are — the rest of the world will not. Wear it like armor, and it can never be used to hurt you. The winters are hard, but the Starks endure. Winter is coming.", author: "Tyrion Lannister", topics: ["identity", "winter", "strength"] },
  { text: "I dont care if he is a bastard. Ned Starks blood runs through his veins. He is my king, from this day until his last day!", author: "Samwell Tarly", topics: ["loyalty", "leadership", "family"] },
];

export default function Home() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<typeof QUOTES>([]);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const filtered = QUOTES.filter(q =>
      q.topics.some(t => t.toLowerCase().includes(topic.trim().toLowerCase()))
    ).slice(0, 3);
    setQuotes(filtered);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-primary drop-shadow-lg">Quote Generator</h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Enter a topic (e.g. winter, loyalty)"
            className="input input-bordered input-primary w-full"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary font-bold">Get Quotes</button>
        </form>
        {submitted && (
          <div className="flex flex-col gap-6">
            {quotes.length > 0 ? (
              quotes.map((q, i) => (
                <div key={i} className="card bg-base-100 shadow-xl border border-primary">
                  <div className="card-body">
                    <p className="text-xl italic text-secondary-content">{q.text}</p>
                    <p className="text-right mt-4 font-semibold text-primary">- {q.author}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="card bg-base-100 shadow-xl border border-error">
                <div className="card-body text-center text-error">
                  No quotes found for "{topic}".
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
