// src/components/rooms/RoomList.jsx
import RoomCard from "./RoomCard";

export default function RoomList({ rooms }) {
  // Zimmer in Paare aufteilen: [0,1], [2,3], ...
  const pairs = [];
  for (let i = 0; i < rooms.length; i += 2) {
    pairs.push(rooms.slice(i, i + 2));
  }

  return (
    <div className="mt-20 space-y-24">
      {pairs.map((pair, rowIndex) => (
        <div
          key={rowIndex}
          className="grid md:grid-cols-2 gap-x-16 gap-y-12 items-start"
        >
          {pair.map((room, colIndex) => {
            const isLeft = colIndex === 0;

            // Welche Karte in dieser Reihe etwas tiefer sitzt:
            // Reihe 0: rechts tiefer, Reihe 1: links tiefer, usw.
            const offsetClass =
              rowIndex % 2 === 0
                ? isLeft
                  ? "md:mt-0"
                  : "md:mt-10"
                : isLeft
                ? "md:mt-10"
                : "md:mt-0";

            return (
              <div key={room.id} className={offsetClass}>
                <RoomCard room={room} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
