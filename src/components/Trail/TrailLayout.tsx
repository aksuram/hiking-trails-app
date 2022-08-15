interface Props {
  coordinateColumn: React.ReactNode;
  mapColumn: React.ReactNode;
}

const TrailLayout = ({ coordinateColumn, mapColumn }: Props) => {
  return (
    <div
      style={{
        display: "grid",
        justifyItems: "center",
        columnGap: "30px",
        gridTemplateColumns: "300px 600px",
      }}
    >
      <div style={{ gridColumn: "1 / 2" }}>
        <>{coordinateColumn}</>
      </div>
      <div style={{ gridColumn: "2 / 3" }}>
        <>{mapColumn}</>
      </div>
    </div>
  );
};

export default TrailLayout;
