"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Game of Thrones quotes array
const QUOTES = [
  { text: "Kill the boy, Jon Snow. Winter is almost upon us. Kill the boy and let the man be born.", author: "Maester Aemon", topics: ["growth", "winter", "transformation"] },
  { text: "Let me tell you something, boy. Never forget what you are — the rest of the world will not. Wear it like armor, and it can never be used to hurt you. The winters are hard, but the Starks endure. Winter is coming.", author: "Tyrion Lannister", topics: ["identity", "winter", "strength"] },
  { text: "I don't care if he's a bastard. Ned Stark's blood runs through his veins. He's my king, from this day until his last day!", author: "Samwell Tarly", topics: ["loyalty", "leadership", "family"] },
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <h1 className="text-3xl font-bold mb-6">Quote Generator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-md">
        <Input
          placeholder="Enter a topic (e.g. motivation, happiness)"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          required
        />
        <Button type="submit">Get Quotes</Button>
      </form>
      {submitted && (
        <div className="flex flex-col gap-4 w-full max-w-md">
          {quotes.length > 0 ? (
            quotes.map((q, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <p className="text-lg italic">"{q.text}"</p>
                  <p className="text-right mt-2 font-semibold">- {q.author}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-4 text-center text-muted-foreground">
                No quotes found for "{topic}".
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
