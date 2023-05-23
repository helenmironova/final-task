import "./placeholder.css";

const Placeholder = ({ text }: { text: string }) => {
  const message = text.split(".").map(item => <div>{item + "."} <br/></div>);
  return <div className="placeholder">{message}</div>;
};

export default Placeholder;
