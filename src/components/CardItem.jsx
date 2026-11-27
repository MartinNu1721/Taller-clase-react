export default function CardItem({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ border: '1px solid #ccc', padding: '15px', margin: '10px', cursor: 'pointer', borderRadius: '8px' }}
    >
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  );
}