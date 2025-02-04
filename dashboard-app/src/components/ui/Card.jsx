// components/ui/card.js
const Card = ({ children }) => {
  return <div className="bg-white p-4 rounded-lg shadow-md">{children}</div>;
};

const CardContent = ({ children }) => {
  return <div className="p-2">{children}</div>;
};

export { Card, CardContent };
