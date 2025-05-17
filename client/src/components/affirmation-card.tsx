import { useState } from "react";
import { Card } from "@/components/ui/card";

type AffirmationCardProps = {
  text: string;
};

export default function AffirmationCard({ text }: AffirmationCardProps) {
  const [selected, setSelected] = useState(false);

  return (
    <Card 
      className={`p-4 cursor-pointer hover:border-accent transition duration-300 ${
        selected ? 'border-accent bg-secondary' : 'bg-white'
      }`}
      onClick={() => setSelected(!selected)}
    >
      <p className="font-medium">{text}</p>
    </Card>
  );
}
